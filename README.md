# IR Seguridad - Cerrajería Tradicional & Digital, Control de Acceso y Cámaras

Landing page de una sola página (single-page) desarrollada para **IR Seguridad**, empresa especializada en cerrajería tradicional y digital, cerraduras inteligentes con apertura biométrica, control de acceso para edificios y comercios, cámaras de seguridad y aperturas de emergencia en CABA y alrededores (Argentina).

---

## 🔒 Identidad Visual y Estética

- **Colores Principales (Planos y Mate):**
  - Azul Corporativo de Seguridad: `#1B4F8C` y `#123763`
  - Negro y Carbón Sólido: `#111827`, `#0B111A`
  - Gris Pizarra y Neutros: `#8FA3B0`, `#64748B`, `#D1DBE2`
  - Fondos Generales: Blanco `#FFFFFF` y Gris suave `#F8FAFC`
  - Secciones de Impacto: Azul oscuro o negro sólido, sin brillos ni degradés chillones
- **Cero Efectos Invasivos:**
  - Cumplimiento de la restricción: sin neones, sin brillos, sin sombras de colores ni estética "gamer" o "glossy". Acabado técnico, sobrio y confiable.
- **Logo:**
  - Escudo oficial con las letras "iR", ondas de conectividad digital, "IR SEGURIDAD" y distintivos de CÁMARAS DE SEGURIDAD, CERRAJERÍA INTELIGENTE y CONTROL DE ACCESO.
- **Tipografía:**
  - *Plus Jakarta Sans* bold y mayúsculas técnicas para títulos, sans-serif limpia para lectura, y *Chakra Petch* para displays técnicos.

---

## 🎯 Secciones y Funcionalidades

1. **Top Bar de Guardia:** Alerta activa de *Aperturas de Emergencia en CABA y alrededores*, enlace a Instagram (`@ir.seguridad`) y WhatsApp directo.
2. **Sticky Header:** Logo oficial, navegación rápida y botón de presupuesto.
3. **Hero Section (Fondo negro sólido / técnico):**
   - Título: *"Modernizá el acceso a tu hogar o negocio"*
   - Subtítulo: *"Cerrajería tradicional y digital, control de acceso y cámaras de seguridad."*
   - CTA hacia WhatsApp y simulador interactivo.
   - Métricas: 24/7 guardia, cobertura CABA y GBA, garantía 100%, apertura en menos de 1 segundo.
4. **Sección Servicios (Tarjetas con íconos de línea planos):**
   - *Cerrajería Tradicional & Digital* (cerrojos de seguridad, cambio de combinación, llaves computadas).
   - *Cerraduras Inteligentes* (biométrica, teclado digital, RFID, app móvil).
   - *Control de Acceso* (edificios, consorcios, empresas, tags RFID, electroimanes).
   - *Cámaras de Seguridad CCTV* (monitoreo en vivo desde el celular, Full HD, visión nocturna).
   - *Aperturas de Emergencia* (atención urgente a domicilio sin romper la puerta).
5. **Sección "¿Cansado/a de perder las llaves?":**
   - Bloque de impacto en azul oscuro con texto blanco.
   - Gancho: *"Con las cerraduras inteligentes modernizá tu hogar y te olvidás para siempre de las llaves."*
   - Detalle de huella digital, clave numérica, tarjeta RFID y app, apto para uso doméstico y comercial.
6. **Sección Cerradura Inteligente Interactiva (Pieza Central):**
   - Hardware interactivo en pantalla con simulación de pestillo mecánico que se retrae, LED de estado rojo/verde y display digital OLED.
   - **Lector de Huella Dactilar:** Al tocar el sensor, escanea y desbloquea el pestillo.
   - **Teclado Numérico Táctil:** Permite teclear dígitos y desbloquear con código PIN (`1234#`).
   - **Simulador de App en Smartphone:** Celular interactivo que envía la orden de apertura a distancia (*"Abrí a distancia desde el celular o bloqueá con tu huella. Sumá control y rapidez al acceso de tu hogar"*).
   - Síntesis de sonido mecánico/electrónico vía Web Audio API.
   - Auto-bloqueo tras 5 segundos y botones de prueba rápida para móviles.
7. **Sección Instalaciones Realizadas:**
   - Galería técnica con trabajos reales (puertas residenciales de madera, control de acceso en blindex de edificios, cámaras IP perimetrales).
8. **Sección "Cuando cada segundo cuenta":**
   - Bloque de impacto sobre seguridad personal, rapidez de ingreso sin demorarse buscando llaves en la vereda y guardia de emergencias.
9. **Sección Contacto:**
   - Formulario de consulta (Nombre, Teléfono, Dirección/Zona, Servicio, Detalle) que envía directamente a WhatsApp con el mensaje estructurado.
   - Datos directos de WhatsApp (+54 9 11 2608-3145) y cobertura en CABA y alrededores.
10. **Footer Sólido:** Logo, accesos rápidos, Instagram `@ir.seguridad` y copyright.
11. **Botón Flotante de WhatsApp:** Visible en todo momento en la esquina inferior con animación sutil de pulso.

---

## 📱 100% Mobile First & Responsive

- Configurado con `max-width: 100vw`, `box-sizing: border-box` y `overflow-x: hidden !important`.
- Cerradura interactiva adaptada a pantallas táctiles con botones generosos (>48px).
- Menú hamburguesa deslizable.

---

## 🚀 Despliegue en Vercel

1. Ingresar a [vercel.com](https://vercel.com) y hacer clic en **Add New... > Project**.
2. Conectar el repositorio de GitHub: `https://github.com/Dyydyyb/ir-seguridad-landing`.
3. Vercel detectará la configuración de [vercel.json](file:///C:/Users/dylan/.gemini/antigravity-ide/scratch/ir-seguridad-landing/vercel.json) de Vite (`npm run build` hacia `dist`).
4. Hacer clic en **Deploy**.

---

## 💻 Ejecución Local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo en http://localhost:5176
npm run dev

# Bundle para producción
npm run build
```
