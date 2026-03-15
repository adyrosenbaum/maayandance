(() => {
  function initAjaxForms() {
    const forms = document.querySelectorAll('form[data-submit-url]');

    forms.forEach((form) => {
      const submitUrl = form.dataset.submitUrl;
      const pageName = form.dataset.page ?? '';
      const feedbackId = form.dataset.feedbackId;

      const successMessage =
        form.dataset.successMessage ?? '✅ הטופס נשלח בהצלחה!';
      const loadingMessage =
        form.dataset.loadingMessage ?? 'שולח...';
      const errorMessage =
        form.dataset.errorMessage ?? '❌ משהו השתבש. נסו שוב.';
      const networkErrorMessage =
        form.dataset.networkErrorMessage ??
        'ייתכן שהטופס נשלח, אבל לא הצלחנו לקבל אישור מהשרת. אם צריך, נסו שוב בעוד רגע.';

      const feedback = feedbackId
        ? document.getElementById(feedbackId)
        : form.querySelector('.form-feedback');

      if (!submitUrl || !feedback) return;

      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(form));
        if (pageName) data.page = pageName;

        feedback.textContent = loadingMessage;
        feedback.style.color = '#3e78b2';

        try {
          const res = await fetch(submitUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(data),
            redirect: 'follow',
          });

          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
          }

          let result = null;
          try {
            result = await res.json();
          } catch (_) {
            result = null;
          }

          if (!result || result.status === 'success') {
            feedback.textContent = successMessage;
            feedback.style.color = '#3d6d4d';
            form.reset();
          } else {
            feedback.textContent = result.message || errorMessage;
            feedback.style.color = '#c44';
          }
        } catch (err) {
          feedback.textContent = networkErrorMessage;
          feedback.style.color = '#8a6d3b';
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initAjaxForms);
})();