document.addEventListener("DOMContentLoaded", () => {

    // Secciones
    const loginSection = document.getElementById("loginSection");
    const registerSection = document.getElementById("registerSection");
    const forgotSection = document.getElementById("forgotSection");

    // Login inputs
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");
    const loginEmailError = document.getElementById("loginEmailError");
    const loginPasswordError = document.getElementById("loginPasswordError");

    // Registro
    const regName = document.getElementById("regName");
    const regEmail = document.getElementById("regEmail");
    const regPassword = document.getElementById("regPassword");
    const regNameError = document.getElementById("regNameError");
    const regEmailError = document.getElementById("regEmailError");
    const regPasswordError = document.getElementById("regPasswordError");
    const strengthBar = document.getElementById("strengthBar");

    // Recuperar
    const forgotEmail = document.getElementById("forgotEmail");
    const forgotEmailError = document.getElementById("forgotEmailError");

    // Botones
    const btnShowRegister = document.getElementById("btnShowRegister");
    const btnBackFromRegister = document.getElementById("btnBackFromRegister");
    const btnShowForgot = document.getElementById("btnShowForgot");
    const btnBackFromForgot = document.getElementById("btnBackFromForgot");
    const btnRegister = document.getElementById("btnRegister");
    const btnLogin = document.getElementById("btnLogin");
    const btnRecover = document.getElementById("btnRecover");

    // Mostrar secciones
    function show(section) {
        loginSection.classList.add("hidden");
        registerSection.classList.add("hidden");
        forgotSection.classList.add("hidden");

        if (section === "login") loginSection.classList.remove("hidden");
        if (section === "register") registerSection.classList.remove("hidden");
        if (section === "forgot") forgotSection.classList.remove("hidden");
    }

    // Toast
    function toast(msg) {
        const t = document.getElementById("toast");
        const div = document.createElement("div");
        div.classList.add("toast-msg");
        div.innerText = msg;
        t.appendChild(div);
        setTimeout(() => div.remove(), 3000);
    }

    // Botones
    btnShowRegister.onclick = () => show("register");
    btnBackFromRegister.onclick = () => show("login");
    btnShowForgot.onclick = () => show("forgot");
    btnBackFromForgot.onclick = () => show("login");

    // Validación email
    function validEmail(e) {
        return /^\S+@\S+\.\S+$/.test(e);
    }

    // Fuerza de contraseña
    regPassword.addEventListener("input", () => {
        let p = regPassword.value;
        let strength = 0;
        if (p.length >= 6) strength += 25;
        if (/[A-Z]/.test(p)) strength += 25;
        if (/[0-9]/.test(p)) strength += 25;
        if (/[@$!%*?&]/.test(p)) strength += 25;
        strengthBar.value = strength;
    });

    // LOGIN
    btnLogin.onclick = async () => {
        loginEmailError.textContent = "";
        loginPasswordError.textContent = "";

        if (!validEmail(loginEmail.value)) {
            loginEmailError.textContent = "Correo inválido";
            return;
        }

        if (loginPassword.value.trim() === "") {
            loginPasswordError.textContent = "Ingresa la contraseña";
            return;
        }

        toast("Iniciando sesión...");

        try {
            const res = await fetch("login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    correo: loginEmail.value,
                    pass: loginPassword.value
                })
            });
            const data = await res.json();

            if (data.ok) {
                toast("¡Bienvenido, " + (data.usuario || "Usuario") + "!");
                // Aquí podrías redirigir, guardar token, etc.
                // window.location.href = "dashboard.php"; // Ejemplo
            } else {
                toast(data.mensaje);
                if (data.mensaje.toLowerCase().includes("contraseña")) {
                    loginPasswordError.textContent = data.mensaje;
                } else {
                    loginEmailError.textContent = data.mensaje;
                }
            }
        } catch (error) {
            console.error(error);
            toast("Error de conexión");
        }
    };

    // REGISTRO
    btnRegister.onclick = async () => {
        regNameError.textContent = "";
        regEmailError.textContent = "";
        regPasswordError.textContent = "";

        if (regName.value.trim() === "") {
            regNameError.textContent = "Ingresa tu nombre";
            return;
        }

        if (!validEmail(regEmail.value)) {
            regEmailError.textContent = "Correo inválido";
            return;
        }

        if (regPassword.value.length < 6) {
            regPasswordError.textContent = "Mínimo 6 caracteres";
            return;
        }

        toast("Creando cuenta...");

        try {
            const res = await fetch("registrar.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre: regName.value,
                    correo: regEmail.value,
                    pass: regPassword.value
                })
            });
            const data = await res.json();

            if (data.ok) {
                toast("Cuenta creada. ¡Ahora inicia sesión!");
                show("login");
            } else {
                toast(data.mensaje);
                regEmailError.textContent = data.mensaje; // Asumimos error en correo por simplicidad
            }
        } catch (error) {
            console.error(error);
            toast("Error de conexión");
        }
    };

    // RECUPERAR CONTRASEÑA
    btnRecover.onclick = () => {
        forgotEmailError.textContent = "";

        if (!validEmail(forgotEmail.value)) {
            forgotEmailError.textContent = "Correo inválido";
            return;
        }

        toast("Se envió un código al correo (Simulado).");
        show("login");
    };

});

