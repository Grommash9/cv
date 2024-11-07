function generatePDF() {
    const loading = document.getElementById('loading');
    const button = document.querySelector('.pdf-button');
    loading.style.display = 'inline-block';
    button.disabled = true;

    const currentScroll = window.scrollY;

    window.scrollTo(0, 0);

    setTimeout(() => {
        const element = document.body;
        const opt = {
            margin: [2, 10, 10, 10],
            filename: 'OleksandrPrudnikov-CV.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true,
                scrollY: -window.scrollY,  // Compensate for scroll
                windowHeight: document.documentElement.offsetHeight
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            }
        };

        button.classList.add('no-print');

        html2pdf().set(opt).from(element).save()
            .then(() => {
                loading.style.display = 'none';
                button.disabled = false;
                button.classList.remove('no-print');
                window.scrollTo(0, currentScroll);
            })
            .catch(err => {
                console.error('Error generating PDF:', err);
                loading.style.display = 'none';
                button.disabled = false;
                button.classList.remove('no-print');
                alert('Error generating PDF. Please try again.');
                window.scrollTo(0, currentScroll);
            });
    }, 100);
}