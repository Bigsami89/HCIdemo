import Link from "next/link"
import { BookOpen, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-uady-azul text-white/90 border-t-4 border-uady-dorado">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand and Motto */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-4">
              <div className="p-2 bg-white/10 rounded-lg">
                <BookOpen className="w-8 h-8 text-uady-dorado" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-2xl tracking-tight text-white">UADY</span>
                <span className="text-[12px] text-uady-dorado font-bold tracking-widest uppercase">E C F C A</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-white/70 max-w-sm italic font-serif border-l-2 border-uady-dorado/40 pl-4 py-1">
              "Luz, Ciencia y Verdad"<br />
              Educación Continua y Formación de Competencias Avanzadas.
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Programs */}
            <div>
              <h3 className="text-xs font-bold text-uady-dorado uppercase tracking-widest mb-6 px-1 border-b border-white/10 pb-2">Programas</h3>
              <ul className="flex flex-col gap-3">
                {["Diplomados", "Cursos cortos", "Certificaciones", "Talleres ejecutivos"].map((item) => (
                  <li key={item}>
                    <Link href="/cursos" className="text-sm text-white/60 hover:text-uady-dorado hover:translate-x-1 transition-all inline-block">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Institution */}
            <div>
              <h3 className="text-xs font-bold text-uady-dorado uppercase tracking-widest mb-6 px-1 border-b border-white/10 pb-2">Institución</h3>
              <ul className="flex flex-col gap-3">
                {["Quiénes somos", "Cuerpo docente", "Modelo educativo", "Aviso de privacidad"].map((item) => (
                  <li key={item}>
                    <Link href="/" className="text-sm text-white/60 hover:text-uady-dorado hover:translate-x-1 transition-all inline-block">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-2 lg:col-span-1">
              <h3 className="text-xs font-bold text-uady-dorado uppercase tracking-widest mb-6 px-1 border-b border-white/10 pb-2">Contacto</h3>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-uady-dorado" />
                  </div>
                  <span className="text-sm text-white/60">admisiones@ecfca.edu.mx</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-uady-dorado" />
                  </div>
                  <span className="text-sm text-white/60">+52 (55) 1234-5678</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-uady-dorado" />
                  </div>
                  <span className="text-sm text-white/60">
                    Mérida, Yucatán, México
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
             <p className="text-[10px] text-white/40 uppercase tracking-widest">
               © {new Date().getFullYear()} Universidad Autónoma de Yucatán - ECFCA
             </p>
             <p className="text-[10px] text-white/20">
               Desarrollado por el área de tecnologías de la información
             </p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-[10px] text-white/40 hover:text-white transition-colors uppercase tracking-widest underline decoration-white/10 underline-offset-4">
              Términos
            </Link>
            <Link href="/" className="text-[10px] text-white/40 hover:text-white transition-colors uppercase tracking-widest underline decoration-white/10 underline-offset-4">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
