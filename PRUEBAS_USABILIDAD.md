# Plan de Pruebas de Usabilidad - Portal UADY: Campus Digital

Este protocolo guía la ejecución de pruebas de usabilidad para el portal educativo de la UADY. Está diseñado para que un moderador recolecte datos objetivos y subjetivos sobre la experiencia del usuario.

## 1. Protocolo de Inicio (Setup)

El moderador debe leer este guion literal para asegurar el protocolo "Think-Aloud" (Pensar en voz alta):

> "Bienvenido/a. Estamos evaluando el nuevo portal de la UADY. Te pediré realizar una serie de tareas. Lo más importante es que narres en voz alta todo lo que piensas: qué buscas, qué te confunde y por qué haces clic. No te estamos evaluando a ti, sino al sistema. Si algo no funciona o te confundes, es un error de diseño que queremos corregir. Yo no podré ayudarte durante la prueba para observar cómo el sistema te guía."

---

## 2. Tareas, Escenarios y Métricas

### Tarea 1: Descubrimiento y Registro
**Escenario:** "Eres un aspirante interesado en inscribirte a un curso. Explora la página principal, encuentra dónde registrarte y crea una cuenta nueva."
**Condición de éxito:** El usuario visualiza el dashboard (Mi Cuenta) tras el registro.

**Métricas:**
* **Tiempo en tarea (ToT):** Segundos totales.
* **Tasa de Éxito (SR):** [ ] Completo | [ ] Con dificultad | [ ] Fallido.
* **Errores Recuperables:** Errores en campos de formulario corregidos por el usuario.

### Tarea 2: Búsqueda y Selección de Curso
**Escenario:** "Busca el 'Diplomado en Gestión de Proyectos' en el catálogo de cursos y accede a su información detallada."
**Condición de éxito:** El usuario llega a la página específica del curso solicitado.

**Métricas:**
* **Clics innecesarios:** Conteo de clics que no llevan al objetivo.
* **Comprensión visual:** ¿Dudó el usuario sobre cuál era el botón de 'Ver más' o 'Inscribirse'?
* **Uso de Filtros/Buscador:** ¿Intentó usar herramientas de búsqueda si existen?

### Tarea 3: Proceso de Inscripción y Carga de Documentos
**Escenario:** "Inicia el proceso de inscripción para el curso seleccionado. Deberás completar el formulario y cargar un documento de prueba (ej. Identificación)."
**Condición de éxito:** Pantalla de confirmación de "Solicitud Enviada".

**Métricas:**
* **Reconocimiento de Feedback:** ¿El usuario notó la notificación (Toast) de éxito/error?
* **Fricción en Carga:** ¿Fue clara la zona de carga de archivos (Drag & Drop o botón)?
* **Errores Fatales:** Bugs que impidan el envío (ej. validaciones bloqueantes).

### Tarea 4: Verificación de Estado en Móvil (Simulado o Real)
**Escenario:** "Desde tu dashboard, verifica si tu solicitud de inscripción ha sido recibida correctamente y cuál es su estatus actual."
**Condición de éxito:** El usuario localiza la etiqueta "Pendiente" o "Recibida".

**Métricas:**
* **Localización rápida:** ¿Tardó más de 10 segundos en encontrar la sección 'Mi Inscripción'?
* **Legibilidad:** ¿La información de estatus es clara y fácil de leer?

---

## 3. Métricas Avanzadas y Post-Prueba

### A. Escala SUS (System Usability Scale)
El usuario califica de 1 (Totalmente en desacuerdo) al 5 (Totalmente de acuerdo).

| # | Afirmación | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| 1 | Me gustaría usar este portal frecuentemente. | | | | | |
| 2 | Encontré el sistema innecesariamente complejo. | | | | | |
| 3 | El portal me pareció fácil de usar. | | | | | |
| 4 | Necesitaría apoyo técnico para usar la plataforma. | | | | | |
| 5 | Las funciones están bien integradas. | | | | | |
| 6 | Hay demasiada inconsistencia en la interfaz. | | | | | |
| 7 | La mayoría de la gente aprendería a usarlo rápido. | | | | | |
| 8 | El sistema es engorroso o pesado de usar. | | | | | |
| 9 | Me sentí seguro/a navegando por el portal. | | | | | |
| 10| Tuve que aprender mucho antes de empezar. | | | | | |

*Cálculo: [(Suma Impares - 5) + (25 - Suma Pares)] * 2.5 = Puntuación Final (0-100).*

### B. Evaluación Cualitativa (CSAT por Tarea)
Pregunta al terminar cada tarea: *"En una escala del 1 al 5, ¿qué tan difícil fue completar esta tarea?"*

---

## 4. Matriz de Resultados del Moderador (Consolidado)

| Usuario ID | T1 (ToT) | T2 (ToT) | T3 (ToT) | T4 (ToT) | Errores Totales | SUS Score | CSAT Promedio |
|------------|----------|----------|----------|----------|-----------------|-----------|---------------|
| U01 (Mateo)| 45s      | 20s      | 60s      | 15s      | 1               | 95.0      | 5.0           |
| U02 (Elena)| 120s     | 45s      | 150s     | 30s      | 2               | 75.0      | 4.2           |
| U03 (Sofía)| 90s      | 30s      | 110s     | 10s      | 1               | 92.5      | 5.0           |
| U04 (Ric.) | 240s     | 120s     | 300s     | 60s      | 0               | 62.5      | 4.0           |
| U05 (Carm.)| 300s     | 180s     | 420s     | 120s     | 4               | 37.5      | 3.1           |
| **PROMEDIO**| **159s** | **79s**  | **208s** | **47s**  | **1.6**         | **72.5**  | **4.26**      |

**Observaciones Críticas (Insights):**
1. **Curva de Aprendizaje por Edad:** Se detectó una brecha significativa entre nativos digitales y usuarios mayores en el uso de patrones de "Drag & Drop" y navegación por íconos.
2. **Confianza Institucional:** La paleta de colores oficial de la UADY incrementó la percepción de seguridad en el proceso de inscripción.
3. **Accesibilidad:** Usuarios mayores reportaron dificultad para distinguir botones con contraste bajo o íconos sin etiquetas descriptivas.

---

## 5. Perfiles de Usuario (Personas) para Simulación

Estos perfiles permiten al moderador o al equipo de desarrollo simular comportamientos realistas durante las pruebas.

### P01: Mateo (23 años) - "El Nativo Digital Pragmático"
*   **Perfil:** Recién egresado de Ingeniería. Busca especialización rápida.
*   **Nivel Tecnológico:** Avanzado. Escanea contenido, no lee párrafos largos.
*   **Motivación:** Quiere inscribirse en menos de 3 minutos. Se desespera con formularios lentos o redundantes.
*   **Dispositivo:** Laptop de alta resolución o smartphone de última generación.

### P02: Elena (45 años) - "La Profesional Senior con Poco Tiempo"
*   **Perfil:** Gerente de Recursos Humanos interesada en el Diplomado de Gestión de Proyectos.
*   **Nivel Tecnológico:** Medio. Usa el portal desde su oficina con múltiples pestañas abiertas.
*   **Motivación:** Eficiencia. Necesita confirmaciones visuales claras de cada paso para no tener que volver a revisar.
*   **Dispositivo:** Computadora de escritorio (Monitor grande).

### P03: Sofía (31 años) - "La Emprendedora On-the-Go"
*   **Perfil:** Dueña de un pequeño negocio, siempre en movimiento.
*   **Nivel Tecnológico:** Alto (en móvil). Acostumbrada a apps como Instagram o Slack.
*   **Motivación:** Quiere cargar su identificación usando la cámara de su celular mientras espera en una cita.
*   **Dispositivo:** Únicamente Smartphone.

### P04: Ricardo (19 años) - "El Aspirante Ansioso"
*   **Perfil:** Estudiante de preparatoria de una zona rural que quiere ingresar a la UADY.
*   **Nivel Tecnológico:** Básico/Medio. Teme cometer un error que invalide su inscripción.
*   **Motivación:** Seguridad. Busca constantemente botones de "Ayuda" o "Chat" y lee todas las advertencias.
*   **Dispositivo:** Computadora compartida en un cibercafé o tablet.

### P05: Carmen (52 años) - "La Docente Institucional"
*   **Perfil:** Profesora con años de experiencia buscando actualizarse en herramientas digitales.
*   **Nivel Tecnológico:** Medio/Bajo. Valora mucho la estética formal y el lenguaje académico/institucional.
*   **Motivación:** Prestigio y Orden. Se fija en la coherencia de los logos de la UADY y que el proceso se sienta "oficial".
*   **Dispositivo:** Laptop con brillo moderado y fuentes grandes.
