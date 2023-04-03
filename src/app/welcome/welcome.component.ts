import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  name: string = 'Rickypedia';
  text: string = '¡Bienvenido a mi página sobre Rick y Morty! Aquí encontrarás todo lo que necesitas saber sobre esta fascinante serie de animación para adultos.Desde su estreno en 2013, Rick y Morty se ha convertido en una de las series de televisión más populares y aclamadas por la crítica. Con su humor irreverente, personajes extravagantes y tramas inteligentes, esta serie ha cautivado a millones de fans en todo el mundo.  En esta página, podrás descubrir todo sobre los personajes principales, los episodios más destacados, los detalles más curiosos y las teorías más locas sobre Rick y Morty. También podrás encontrar noticias y novedades sobre la serie y su equipo creativo. Si eres un fanático de la ciencia ficción, la comedia y las aventuras interdimensionales, ¡este es el lugar para ti! Explora nuestra página, comparte tus opiniones y descubre todo lo que necesitas saber sobre Rick y Morty.'
  img: string = '../assets/welcome-rick.jpg';
}
