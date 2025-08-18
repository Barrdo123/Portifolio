
document.addEventListener('DOMContentLoaded', function() {
    
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.card, #sobre .row, #contato form');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    

    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    const form = document.querySelector('form');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const mensagemInput = document.getElementById('mensagem');
    

    function validarCampo(campo, mensagemErro) {
        const valor = campo.value.trim();
        const erroElement = campo.parentElement.querySelector('.erro');
        
        if (erroElement) {
            erroElement.remove();
        }
        
        if (!valor) {
            mostrarErro(campo, mensagemErro);
            return false;
        }
        

        if (campo.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(valor)) {
                mostrarErro(campo, 'Por favor, insira um email válido');
                return false;
            }
        }
        
        campo.classList.remove('is-invalid');
        return true;
    }
    
    function mostrarErro(campo, mensagem) {
        campo.classList.add('is-invalid');
        const erroDiv = document.createElement('div');
        erroDiv.className = 'erro text-danger small mt-1';
        erroDiv.textContent = mensagem;
        campo.parentElement.appendChild(erroDiv);
    }
    

    if (nomeInput && emailInput && mensagemInput) {
        [nomeInput, emailInput, mensagemInput].forEach(campo => {
            campo.addEventListener('blur', function() {
                if (this.id === 'nome') validarCampo(this, 'Nome é obrigatório');
                if (this.id === 'email') validarCampo(this, 'Email é obrigatório');
                if (this.id === 'mensagem') validarCampo(this, 'Mensagem é obrigatória');
            });
            
            campo.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    const erroElement = this.parentElement.querySelector('.erro');
                    if (erroElement) erroElement.remove();
                    this.classList.remove('is-invalid');
                }
            });
        });
    }
    

    emailjs.init("ko_SQVYLiAFJcGcND"); 
    

    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnSpinner = document.getElementById('btnSpinner');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nomeInput = document.getElementById('nome');
            const emailInput = document.getElementById('email');
            const mensagemInput = document.getElementById('mensagem');
            
            const nomeValido = nomeInput ? validarCampo(nomeInput, 'Nome é obrigatório') : true;
            const emailValido = emailInput ? validarCampo(emailInput, 'Email é obrigatório') : true;
            const mensagemValida = mensagemInput ? validarCampo(mensagemInput, 'Mensagem é obrigatória') : true;
            
            if (nomeValido && emailValido && mensagemValida) {

                btnText.style.display = 'none';
                btnSpinner.style.display = 'inline-block';
                submitBtn.disabled = true;
                

                const templateParams = {
                    nome: nomeInput.value,
                    email: emailInput.value,
                    mensagem: mensagemInput.value,
                    to_email: 'eduardo.barrdo@gmail.com'
                };
                

                emailjs.send('service_9n23olt', 'template_noj6vjg', templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);

                        contactForm.reset();
                        

                        formMessage.innerHTML = `
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>Sucesso!</strong> Sua mensagem foi enviada para eduardo.barrdo@gmail.com. Entrarei em contato em breve.
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        `;
                        

                        btnText.style.display = 'inline';
                        btnSpinner.style.display = 'none';
                        submitBtn.disabled = false;
                        

                        setTimeout(() => {
                            formMessage.innerHTML = '';
                        }, 5000);
                        
                    }, function(error) {
                        console.log('FAILED...', error);
                        

                        formMessage.innerHTML = `
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>Erro!</strong> Não foi possível enviar a mensagem. Por favor, tente novamente.
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        `;
                        

                        btnText.style.display = 'inline';
                        btnSpinner.style.display = 'none';
                        submitBtn.disabled = false;
                        

                        setTimeout(() => {
                            formMessage.innerHTML = '';
                        }, 5000);
                    });
            }
        });
    }

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        const rate = scrolled * -0.5;
        
        if (header) {
            header.style.transform = `translateY(${rate}px)`;
        }
    });
    
   
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }
    
    
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
  
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
