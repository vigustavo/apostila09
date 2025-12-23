document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. DARK MODE (Funciona em todas as telas) ---
    const themeBtn = document.getElementById('theme-toggle');
    const icon = themeBtn.querySelector('i');
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.classList.replace('ph-moon', 'ph-sun');
    }

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        icon.classList.toggle('ph-moon');
        icon.classList.toggle('ph-sun');
    });

    // --- 2. FUNÇÕES GERAIS (Mostrar Senha) ---
    const togglePassBtn = document.querySelector('.toggle-pass');
    const senhaInput = document.getElementById('senha');

    if(togglePassBtn && senhaInput) {
        togglePassBtn.addEventListener('click', () => {
            const type = senhaInput.getAttribute('type') === 'password' ? 'text' : 'password';
            senhaInput.setAttribute('type', type);
            togglePassBtn.querySelector('i').classList.toggle('ph-eye');
            togglePassBtn.querySelector('i').classList.toggle('ph-eye-slash');
        });
    }

    // --- 3. LÓGICA ESPECÍFICA DO CADASTRO ---
    const cadastroForm = document.getElementById('cadastro-form');
    if (cadastroForm) {
        // Medidor de Força (Só existe no cadastro)
        senhaInput.addEventListener('input', (e) => {
            const val = e.target.value;
            const barContainer = document.querySelector('.strength-bar');
            const bar = barContainer.querySelector('.bar');
            
            if(val.length > 0) barContainer.style.display = 'block';
            else barContainer.style.display = 'none';

            let strength = 0;
            if(val.length >= 6) strength += 33;
            if(val.match(/[A-Z]/)) strength += 33;
            if(val.match(/[0-9]/)) strength += 34;

            bar.style.width = strength + '%';
            if(strength < 50) bar.style.background = '#ef4444';
            else if(strength < 100) bar.style.background = '#f59e0b';
            else bar.style.background = '#10b981';
        });

        handleFormSubmit(cadastroForm, 'Conta criada com sucesso!');
    }

    // --- 4. LÓGICA ESPECÍFICA DO LOGIN ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        handleFormSubmit(loginForm, 'Login realizado com sucesso! Redirecionando...');
    }

    // Função para simular envio com Loading
    function handleFormSubmit(form, successMsg) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-submit');
            
            // Ativa animação de loading
            btn.classList.add('loading');
            btn.setAttribute('disabled', true);

            setTimeout(() => {
                btn.classList.remove('loading');
                btn.removeAttribute('disabled');
                alert(successMsg);
                if(form.id === 'cadastro-form') form.reset();
                // Se fosse real, aqui redirecionaria: window.location.href = 'dashboard.html';
            }, 2000);
        });
    }
});