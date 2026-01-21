import { supabase } from '../lib/supabase';

/**
 * Global form interceptor
 * Automatically detects and handles all forms on the site.
 */
export function initForms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerText : 'Submit';

            // UI Feedback: Loading
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = 'Sending...';
            }

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // 1. Honeypot check (Invisible spam protection)
            if (data.website_sync && data.website_sync.trim() !== "") {
                console.warn('Bot detected via honeypot.');
                showFeedback(form, 'Success! We have received your request.', 'success');
                form.reset();
                return;
            }

            // 2. Data Cleaning & Normalization
            const submissionData = {};
            for (const key in data) {
                if (key === 'website_sync' || key === 'cf-turnstile-response') continue;
                // Convert hyphens to underscores for DB compatibility (e.g. project-type -> project_type)
                const cleanKey = key.replace(/-/g, '_');
                submissionData[cleanKey] = data[key];
            }

            // Add metadata
            submissionData.submitted_at = new Date().toISOString();
            submissionData.page_url = window.location.href;

            console.log('Form captured (normalized):', submissionData);

            try {
                if (!supabase) {
                    throw new Error('Supabase not initialized (Running in demo mode)');
                }

                // Determine table based on form presence or id
                // Default to 'enquiries'
                const table = form.id === 'contactForm' ? 'enquiries' : 'enquiries';

                const { error } = await supabase
                    .from('enquiries')
                    .insert([submissionData]);

                if (error) throw error;

                // Success
                showFeedback(form, 'Success! We have received your request.', 'success');
                form.reset();
            } catch (error) {
                console.error('Submission error:', error);

                // If demo mode (no supabase), we still want to show "success" for UX
                if (!supabase) {
                    showFeedback(form, 'Success! (Demo Mode: Data logged to console)', 'success');
                    form.reset();
                } else {
                    showFeedback(form, 'Error: ' + error.message, 'error');
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalBtnText;
                }
            }
        });
    });
}

function showFeedback(form, message, type) {
    // Remove existing feedback
    const existing = form.querySelector('.form-feedback');
    if (existing) existing.remove();

    const feedback = document.createElement('div');
    feedback.className = `form-feedback feedback-${type}`;
    feedback.innerText = message;

    // Simple styling
    Object.assign(feedback.style, {
        padding: '1rem',
        marginTop: '1rem',
        borderRadius: '4px',
        textAlign: 'center',
        fontWeight: '500',
        backgroundColor: type === 'success' ? '#def7ec' : '#fde8e8',
        color: type === 'success' ? '#03543f' : '#9b1c1c',
        border: `1px solid ${type === 'success' ? '#84e1bc' : '#f8b4b4'}`
    });

    form.appendChild(feedback);

    // Auto-remove after 5 seconds
    setTimeout(() => feedback.remove(), 5000);
}
