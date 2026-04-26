import { useState } from 'react';
import { Trophy, Check, X, RotateCcw, Star } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

type RawQuestion = [question: string, options: [string, string, string, string], correct: number];

const rawQuestions: RawQuestion[] = [
  ['¿En qué años México ha sido sede de la Copa del Mundo?', ['1970 y 1986', '1994 y 2006', '1966 y 1998', '2002 y 2010'], 0],
  ['¿Cuál es el apodo de la selección de México?', ['Guerreros', 'El Tri', 'Aztecas', 'Verdes'], 1],
  ['¿Cuál es el estadio más emblemático donde juega México?', ['Estadio Akron', 'Estadio BBVA', 'Estadio Azteca', 'Estadio CU'], 2],
  ['¿Contra qué selección tiene mayor rivalidad México?', ['Argentina', 'Brasil', 'Estados Unidos', 'España'], 2],
  ['¿Hasta qué fase ha llegado México en Copas del Mundo?', ['Final', 'Semifinal', 'Cuartos de final', 'Octavos'], 2],
  ['¿En qué año Estados Unidos organizó la Copa del Mundo?', ['1994', '2002', '2010', '1986'], 0],
  ['¿Cuál es el apodo de la selección de Estados Unidos?', ['Eagles', 'Team USA', 'Yankees', 'Stars'], 1],
  ['¿Quién es una de las principales estrellas actuales de Estados Unidos?', ['Landon Donovan', 'Christian Pulisic', 'Clint Dempsey', 'Gio Reyna'], 1],
  ['¿A qué confederación pertenece Estados Unidos?', ['UEFA', 'CONMEBOL', 'CONCACAF', 'AFC'], 2],
  ['¿Cuál es el mejor resultado de Estados Unidos en un Mundial?', ['Campeón', 'Subcampeón', 'Tercer lugar', 'Cuartos'], 2],
  ['¿En qué año Canadá participó por primera vez en un Mundial?', ['1986', '1994', '2002', '1978'], 0],
  ['¿Qué jugador es una de las principales figuras actuales de Canadá?', ['Jonathan David', 'Alphonso Davies', 'Larin', 'Buchanan'], 1],
  ['¿Cuál es el apodo de la selección de Canadá?', ['Los Rojos', 'Los Blancos', 'Maple Team', 'Norteños'], 0],
  ['¿Qué torneo ganó Canadá en el año 2000?', ['Copa América', 'Copa Oro', 'Nations League', 'Confederaciones'], 1],
  ['¿A qué confederación pertenece Canadá?', ['UEFA', 'AFC', 'CONCACAF', 'CAF'], 2],
  ['¿Cuál ha sido la mejor participación de Costa Rica en un Mundial?', ['Octavos', 'Cuartos de final 2014', 'Semifinal', 'Final'], 1],
  ['¿Qué portero fue clave para Costa Rica en el Mundial 2014?', ['Ochoa', 'Keylor Navas', 'Bravo', 'Muslera'], 1],
  ['¿Cuál es el apodo de la selección de Costa Rica?', ['Ticos', 'Verdes', 'Cafeteros', 'Guerreros'], 0],
  ['¿A qué confederación pertenece Costa Rica?', ['CONCACAF', 'UEFA', 'CAF', 'AFC'], 0],
  ['¿Qué selección eliminó Costa Rica en el Mundial 2014?', ['España', 'Italia', 'Brasil', 'Francia'], 1],
  ['¿En qué año Panamá debutó en la Copa del Mundo?', ['2014', '2018', '2022', '2010'], 1],
  ['¿Contra qué selección jugó su primer partido mundialista Panamá?', ['Inglaterra', 'Bélgica', 'Japón', 'Brasil'], 1],
  ['¿Cuál es el apodo de la selección de Panamá?', ['Canaleros', 'Rojos', 'Guerreros', 'Tigres'], 0],
  ['¿Quién anotó el primer gol de Panamá en un Mundial?', ['Torres', 'Baloy', 'Gómez', 'Rodríguez'], 1],
  ['¿A qué confederación pertenece Panamá?', ['UEFA', 'CONCACAF', 'AFC', 'CAF'], 1],
  ['¿En qué año Jamaica participó en su primer Mundial?', ['1998', '2002', '1994', '2010'], 0],
  ['¿Cuál es el apodo de la selección de Jamaica?', ['Reggae Boyz', 'Rastas', 'Caribeños', 'Verdes'], 0],
  ['¿Qué otro deporte es muy popular en Jamaica además del fútbol?', ['Béisbol', 'Atletismo', 'Rugby', 'Básquetbol'], 1],
  ['¿A qué confederación pertenece Jamaica?', ['CONCACAF', 'UEFA', 'CAF', 'AFC'], 0],
  ['¿Contra qué selección consiguió su primera victoria mundialista Jamaica?', ['Francia', 'Japón', 'Brasil', 'México'], 1],
  ['¿Cuántos Mundiales ha ganado Argentina?', ['2', '3', '4', '5'], 1],
  ['¿Qué jugador fue clave para que Argentina ganara el Mundial 2022?', ['Di María', 'Lionel Messi', 'Julián Álvarez', 'Dybala'], 1],
  ['¿Cuál es el apodo de la selección de Argentina?', ['Gauchos', 'Albiceleste', 'Pampas', 'Leones'], 1],
  ['¿Qué jugador histórico es considerado leyenda en Argentina?', ['Pelé', 'Maradona', 'Zidane', 'Ronaldo'], 1],
  ['¿Contra qué país tiene mayor rivalidad Argentina?', ['Uruguay', 'Brasil', 'Chile', 'España'], 1],
  ['¿Cuántos Mundiales ha ganado Brasil?', ['3', '4', '5', '6'], 2],
  ['¿Qué jugador es considerado el mejor de la historia de Brasil?', ['Ronaldo', 'Ronaldinho', 'Pelé', 'Neymar'], 2],
  ['¿Cuál es el apodo de la selección de Brasil?', ['Verdeamarela', 'Canarinha', 'Samba', 'Guerreros'], 1],
  ['¿Qué color predomina en el uniforme de Brasil?', ['Azul', 'Verde', 'Amarillo', 'Blanco'], 2],
  ['¿En qué año ganó su último Mundial Brasil?', ['1998', '2002', '2006', '2010'], 1],
  ['¿Cuántos Mundiales ha ganado Uruguay?', ['1', '2', '3', '4'], 1],
  ['¿En qué año organizó Uruguay el primer Mundial?', ['1920', '1930', '1940', '1950'], 1],
  ['¿Cuál es el apodo de la selección de Uruguay?', ['Celeste', 'Charrúas', 'Guerreros', 'Leones'], 0],
  ['¿Contra qué país tiene mayor rivalidad Uruguay?', ['Brasil', 'Argentina', 'Chile', 'Perú'], 1],
  ['¿Qué logró Uruguay en el Mundial 2010?', ['Campeón', 'Subcampeón', 'Cuarto lugar', 'Octavos'], 2],
  ['¿Qué jugador fue figura de Colombia en el Mundial 2014?', ['Falcao', 'James Rodríguez', 'Cuadrado', 'Valderrama'], 1],
  ['¿Cuál es el apodo de la selección de Colombia?', ['Cafeteros', 'Tricolores', 'Guerreros', 'Leones'], 0],
  ['¿A qué confederación pertenece Colombia?', ['UEFA', 'CONMEBOL', 'CONCACAF', 'CAF'], 1],
  ['¿Cuál ha sido el mejor resultado de Colombia en un Mundial?', ['Final', 'Semifinal', 'Cuartos de final', 'Octavos'], 2],
  ['¿Qué color predomina en el uniforme de Colombia?', ['Azul', 'Amarillo', 'Rojo', 'Verde'], 1],
  ['¿Qué torneo ganó Chile en 2015 y 2016?', ['Mundial', 'Copa América', 'Confederaciones', 'Nations League'], 1],
  ['¿Cuál es el apodo de la selección de Chile?', ['Roja', 'Guerreros', 'Cóndores', 'Andes'], 0],
  ['¿Cómo se le conoce a la generación exitosa de Chile?', ['Generación Oro', 'Generación Dorada', 'Generación Roja', 'Generación Andina'], 1],
  ['¿A qué confederación pertenece Chile?', ['CONMEBOL', 'UEFA', 'CONCACAF', 'AFC'], 0],
  ['¿Cuál ha sido el mejor resultado de Chile en un Mundial?', ['Campeón', 'Subcampeón', 'Tercer lugar', 'Cuartos'], 2],
  ['¿En qué año debutó Ecuador en un Mundial?', ['1998', '2002', '2006', '2010'], 1],
  ['¿Cuál es el apodo de la selección de Ecuador?', ['Tri', 'Amarillos', 'Andes', 'Guerreros'], 0],
  ['¿A qué confederación pertenece Ecuador?', ['UEFA', 'CONMEBOL', 'CONCACAF', 'CAF'], 1],
  ['¿Cuál ha sido el mejor resultado de Ecuador en un Mundial?', ['Cuartos', 'Octavos de final', 'Semifinal', 'Final'], 1],
  ['¿Qué colores usa la selección de Ecuador?', ['Azul y blanco', 'Amarillo, azul y rojo', 'Verde y blanco', 'Rojo y negro'], 1],
  ['¿Cuántos Mundiales ha ganado Francia?', ['1', '2', '3', '4'], 1],
  ['¿Qué jugador fue figura en el Mundial 2018 con Francia?', ['Griezmann', 'Mbappé', 'Benzema', 'Pogba'], 1],
  ['¿Cuál es el apodo de la selección de Francia?', ['Les Bleus', 'Galos', 'Guerreros', 'Leones'], 0],
  ['¿Qué jugador es estrella actual de Francia?', ['Giroud', 'Mbappé', 'Kanté', 'Coman'], 1],
  ['¿Contra qué país tiene rivalidad histórica Francia?', ['España', 'Alemania', 'Italia', 'Inglaterra'], 1],
  ['¿En qué año ganó España su Mundial?', ['2006', '2010', '2014', '2018'], 1],
  ['¿Cuál es el apodo de la selección de España?', ['Roja', 'Toros', 'Guerreros', 'Iberia'], 0],
  ['¿Qué estilo de juego hizo famoso a España?', ['Contraataque', 'Tiki-taka', 'Defensa total', 'Juego largo'], 1],
  ['¿Quién anotó el gol en la final del Mundial 2010 para España?', ['Villa', 'Iniesta', 'Torres', 'Xavi'], 1],
  ['¿A qué confederación pertenece España?', ['UEFA', 'CONMEBOL', 'AFC', 'CONCACAF'], 0],
  ['¿Cuántos Mundiales ha ganado Inglaterra?', ['0', '1', '2', '3'], 1],
  ['¿En qué año ganó Inglaterra su único Mundial?', ['1958', '1966', '1970', '1982'], 1],
  ['¿Cuál es el apodo de la selección de Inglaterra?', ['Lions', 'Three Lions', 'Eagles', 'Kings'], 1],
  ['¿Qué liga pertenece a Inglaterra?', ['LaLiga', 'Serie A', 'Premier League', 'Bundesliga'], 2],
  ['¿Quién es uno de los goleadores recientes de Inglaterra?', ['Rooney', 'Kane', 'Lampard', 'Gerrard'], 1],
  ['¿Cuántos Mundiales ha ganado Alemania?', ['3', '4', '5', '2'], 1],
  ['¿En qué año ganó su último Mundial Alemania?', ['2010', '2014', '2006', '2018'], 1],
  ['¿Cuál es el apodo de la selección de Alemania?', ['Die Mannschaft', 'Eagles', 'Guerreros', 'Leones'], 0],
  ['¿Quién anotó el gol de la final 2014 para Alemania?', ['Müller', 'Kroos', 'Götze', 'Özil'], 2],
  ['¿Contra qué país tiene rivalidad histórica Alemania?', ['Francia', 'Argentina', 'Italia', 'España'], 1],
  ['¿Cuántos Mundiales ha ganado Italia?', ['3', '4', '2', '5'], 1],
  ['¿Cuál es el apodo de la selección de Italia?', ['Azzurri', 'Romanos', 'Gladiadores', 'Leones'], 0],
  ['¿En qué año ganó su último Mundial Italia?', ['2002', '2006', '2010', '2014'], 1],
  ['¿Qué estilo defensivo es famoso en Italia?', ['Tiki-taka', 'Catenaccio', 'Presión alta', 'Juego largo'], 1],
  ['¿Qué jugador histórico es leyenda en Italia?', ['Maldini', 'Zidane', 'Messi', 'Ronaldo'], 0],
  ['¿Cuántas finales ha jugado Países Bajos?', ['1', '2', '3', '4'], 2],
  ['¿Cuál es el apodo de la selección de Países Bajos?', ['Naranja Mecánica', 'Tulipanes', 'Guerreros', 'Leones'], 0],
  ['¿Qué color identifica a Países Bajos?', ['Azul', 'Naranja', 'Verde', 'Rojo'], 1],
  ['¿Qué estilo desarrolló Países Bajos?', ['Defensa total', 'Fútbol Total', 'Contraataque', 'Juego directo'], 1],
  ['¿A qué confederación pertenece Países Bajos?', ['UEFA', 'CONMEBOL', 'CAF', 'AFC'], 0],
  ['¿Cómo se le conoce a la generación exitosa de Bélgica?', ['Generación Dorada', 'Generación Roja', 'Generación Europa', 'Generación Fútbol'], 0],
  ['¿Cuál es el mejor resultado de Bélgica en un Mundial?', ['Campeón', 'Final', 'Tercer lugar 2018', 'Cuartos'], 2],
  ['¿Qué jugador es estrella de Bélgica?', ['Hazard', 'De Bruyne', 'Lukaku', 'Courtois'], 1],
  ['¿A qué confederación pertenece Bélgica?', ['UEFA', 'CAF', 'AFC', 'CONMEBOL'], 0],
  ['¿Cuál es el apodo de la selección de Bélgica?', ['Diablos Rojos', 'Leones', 'Guerreros', 'Águilas'], 0],
  ['¿Qué jugador es el más famoso de Portugal?', ['Figo', 'Cristiano Ronaldo', 'Pepe', 'Bernardo Silva'], 1],
  ['¿Qué título importante ha ganado Portugal?', ['Mundial', 'Eurocopa 2016', 'Copa América', 'Nations League'], 1],
  ['¿Cuál es el apodo de la selección de Portugal?', ['Lusos', 'Quinas', 'Guerreros', 'Marinos'], 1],
  ['¿A qué confederación pertenece Portugal?', ['UEFA', 'CONMEBOL', 'CAF', 'AFC'], 0],
  ['¿Cuál ha sido el mejor resultado de Portugal en un Mundial?', ['Campeón', 'Subcampeón', 'Tercer lugar', 'Cuartos'], 2],
  ['¿Qué logró Croacia en el Mundial 2018?', ['Campeón', 'Subcampeón', 'Tercer lugar', 'Cuartos'], 1],
  ['¿Quién fue la figura de Croacia en 2018?', ['Mandžukić', 'Luka Modrić', 'Rakitić', 'Perišić'], 1],
  ['¿Cuál es el apodo de la selección de Croacia?', ['Vatreni', 'Guerreros', 'Balcánicos', 'Leones'], 0],
  ['¿A qué confederación pertenece Croacia?', ['UEFA', 'CONMEBOL', 'AFC', 'CAF'], 0],
  ['¿Qué colores usa Croacia en su uniforme?', ['Azul', 'Rojo y blanco', 'Verde', 'Negro'], 1],
  ['¿Qué torneo ganó Dinamarca en 1992?', ['Mundial', 'Eurocopa', 'Copa América', 'Nations League'], 1],
  ['¿Cuál es el apodo de la selección de Dinamarca?', ['Vikingos', 'Daneses Rojos', 'Daneses', 'Guerreros'], 2],
  ['¿A qué confederación pertenece Dinamarca?', ['UEFA', 'CONCACAF', 'CAF', 'AFC'], 0],
  ['¿Qué jugador histórico es figura de Dinamarca?', ['Laudrup', 'Eriksen', 'Poulsen', 'Schmeichel'], 0],
  ['¿Cuál ha sido el mejor resultado de Dinamarca en un Mundial?', ['Campeón', 'Cuartos de final', 'Semifinal', 'Final'], 1],
  ['¿Cuál es el apodo de la selección de Suiza?', ['Helvéticos', 'Nati', 'Alpinos', 'Guerreros'], 1],
  ['¿A qué confederación pertenece Suiza?', ['UEFA', 'AFC', 'CAF', 'CONMEBOL'], 0],
  ['¿Cuál es el mejor resultado de Suiza en Mundiales?', ['Campeón', 'Cuartos de final', 'Semifinal', 'Final'], 1],
  ['¿Qué color predomina en el uniforme de Suiza?', ['Azul', 'Verde', 'Rojo', 'Negro'], 2],
  ['¿Qué país tiene una bandera similar a la de Suiza?', ['Japón', 'Dinamarca', 'Italia', 'Francia'], 1],
  ['¿Cuál es el apodo de la selección de Serbia?', ['Águilas Blancas', 'Leones', 'Guerreros', 'Balcánicos'], 0],
  ['¿A qué confederación pertenece Serbia?', ['UEFA', 'CAF', 'AFC', 'CONCACAF'], 0],
  ['¿Qué país representaba antes Serbia en torneos internacionales?', ['Yugoslavia', 'Rusia', 'Austria', 'Hungría'], 0],
  ['¿Qué colores usa la selección de Serbia?', ['Verde', 'Rojo, azul y blanco', 'Negro', 'Amarillo'], 1],
  ['¿Cuál ha sido el mejor resultado histórico de Serbia/Yugoslavia en un Mundial?', ['Campeón', 'Subcampeón', 'Cuartos de final', 'Octavos'], 2],
  ['¿Qué jugador es la principal figura actual de Polonia?', ['Lewandowski', 'Zielinski', 'Szczesny', 'Milik'], 0],
  ['¿Cuál es el apodo de la selección de Polonia?', ['Águilas Blancas', 'Guerreros', 'Polacos', 'Leones'], 0],
  ['¿A qué confederación pertenece Polonia?', ['UEFA', 'CAF', 'AFC', 'CONCACAF'], 0],
  ['¿Cuál ha sido el mejor resultado de Polonia en un Mundial?', ['Campeón', 'Subcampeón', 'Tercer lugar', 'Cuartos'], 2],
  ['¿Qué colores usa Polonia?', ['Azul', 'Rojo y blanco', 'Verde', 'Negro'], 1],
  ['¿Qué logró Turquía en el Mundial 2002?', ['Campeón', 'Subcampeón', 'Tercer lugar', 'Cuartos'], 2],
  ['¿Cuál es el apodo de la selección de Turquía?', ['Media Luna', 'Guerreros', 'Leones', 'Imperio'], 0],
  ['¿A qué confederación pertenece Turquía?', ['UEFA', 'AFC', 'CAF', 'CONMEBOL'], 0],
  ['¿Qué color predomina en el uniforme de Turquía?', ['Azul', 'Verde', 'Rojo', 'Blanco'], 2],
  ['¿En qué continente se ubica parcialmente Turquía?', ['América', 'Europa y Asia', 'África', 'Oceanía'], 1],
  ['¿Qué logró Suecia en el Mundial 1958?', ['Campeón', 'Subcampeón', 'Tercer lugar', 'Cuartos'], 1],
  ['¿Cuál es el apodo de la selección de Suecia?', ['Vikingos', 'Blågult', 'Guerreros', 'Leones'], 1],
  ['¿Qué jugador famoso ha representado a Suecia?', ['Ibrahimović', 'Haaland', 'Modrić', 'Bale'], 0],
  ['¿A qué confederación pertenece Suecia?', ['UEFA', 'CAF', 'AFC', 'CONCACAF'], 0],
  ['¿Qué colores usa Suecia?', ['Rojo y blanco', 'Azul y amarillo', 'Verde', 'Negro'], 1],
  ['¿Cuál ha sido el mejor resultado de Ucrania en un Mundial?', ['Campeón', 'Semifinal', 'Cuartos 2006', 'Octavos'], 2],
  ['¿Qué jugador histórico destaca en Ucrania?', ['Shevchenko', 'Modrić', 'Lewandowski', 'Bale'], 0],
  ['¿A qué confederación pertenece Ucrania?', ['UEFA', 'CAF', 'AFC', 'CONCACAF'], 0],
  ['¿Qué colores usa la selección de Ucrania?', ['Azul y amarillo', 'Rojo', 'Verde', 'Negro'], 0],
  ['¿En qué año debutó Ucrania en un Mundial?', ['2002', '2006', '2010', '1998'], 1],
  ['¿Qué logró Marruecos en el Mundial 2022?', ['Campeón', 'Subcampeón', 'Semifinales', 'Cuartos'], 2],
  ['¿Cuál es el apodo de la selección de Marruecos?', ['Leones del Atlas', 'Guerreros', 'Tigres', 'Águilas'], 0],
  ['¿A qué confederación pertenece Marruecos?', ['CAF', 'UEFA', 'AFC', 'CONMEBOL'], 0],
  ['¿Qué colores usa la selección de Marruecos?', ['Azul', 'Rojo y verde', 'Amarillo', 'Negro'], 1],
  ['¿En qué continente se ubica Marruecos?', ['Europa', 'Asia', 'África', 'América'], 2],
  ['¿Qué logró Senegal en el Mundial 2002?', ['Campeón', 'Subcampeón', 'Cuartos de final', 'Octavos'], 2],
  ['¿Cuál es el apodo de la selección de Senegal?', ['Leones de Teranga', 'Guerreros', 'Tigres', 'Águilas'], 0],
  ['¿Qué jugador fue figura de Senegal recientemente?', ['Salah', 'Mané', 'Drogba', 'Eto’o'], 1],
  ['¿A qué confederación pertenece Senegal?', ['CAF', 'UEFA', 'AFC', 'CONCACAF'], 0],
  ['¿Qué color predomina en el uniforme de Senegal?', ['Verde', 'Azul', 'Rojo', 'Negro'], 0],
  ['¿Cuál es el apodo de la selección de Nigeria?', ['Súper Águilas', 'Leones', 'Guerreros', 'Tigres'], 0],
  ['¿Qué logro olímpico tiene Nigeria en fútbol?', ['Plata', 'Oro 1996', 'Bronce', 'Ninguno'], 1],
  ['¿A qué confederación pertenece Nigeria?', ['CAF', 'UEFA', 'AFC', 'CONMEBOL'], 0],
  ['¿Qué colores usa la selección de Nigeria?', ['Verde y blanco', 'Rojo', 'Azul', 'Negro'], 0],
  ['¿Cuál ha sido el mejor resultado de Nigeria en Mundiales?', ['Semifinal', 'Cuartos', 'Octavos de final', 'Final'], 2],
  ['¿Qué logró Camerún en el Mundial 1990?', ['Campeón', 'Subcampeón', 'Cuartos de final', 'Octavos'], 2],
  ['¿Cuál es el apodo de la selección de Camerún?', ['Leones Indomables', 'Guerreros', 'Tigres', 'Águilas'], 0],
  ['¿Qué jugador histórico destacó en Camerún?', ['Drogba', 'Eto’o', 'Salah', 'Mané'], 1],
  ['¿A qué confederación pertenece Camerún?', ['CAF', 'UEFA', 'AFC', 'CONCACAF'], 0],
  ['¿Qué colores usa la selección de Camerún?', ['Verde, rojo y amarillo', 'Azul', 'Negro', 'Blanco'], 0],
  ['¿Qué logró Ghana en el Mundial 2010?', ['Campeón', 'Subcampeón', 'Cuartos de final', 'Octavos'], 2],
  ['¿Cuál es el apodo de la selección de Ghana?', ['Estrellas Negras', 'Leones', 'Guerreros', 'Águilas'], 0],
  ['¿A qué confederación pertenece Ghana?', ['CAF', 'UEFA', 'AFC', 'CONCACAF'], 0],
  ['¿Qué colores usa la selección de Ghana?', ['Rojo, amarillo y verde', 'Azul', 'Negro', 'Blanco'], 0],
  ['¿Qué jugador destacó en Ghana?', ['Gyan', 'Salah', 'Mané', 'Eto’o'], 0],
  ['¿Qué victoria histórica logró Argelia en 1982?', ['vs Brasil', 'vs Alemania', 'vs Francia', 'vs Italia'], 1],
  ['¿Cuál es el apodo de la selección de Argelia?', ['Zorros del Desierto', 'Leones', 'Guerreros', 'Tigres'], 0],
  ['¿A qué confederación pertenece Argelia?', ['CAF', 'UEFA', 'AFC', 'CONMEBOL'], 0],
  ['¿Qué color predomina en el uniforme de Argelia?', ['Verde', 'Azul', 'Rojo', 'Negro'], 0],
  ['¿Cuál ha sido el mejor resultado de Argelia en un Mundial?', ['Cuartos', 'Octavos de final', 'Semifinal', 'Final'], 1],
  ['¿Cuál es el apodo de la selección de Túnez?', ['Águilas de Cartago', 'Leones', 'Guerreros', 'Tigres'], 0],
  ['¿A qué confederación pertenece Túnez?', ['CAF', 'UEFA', 'AFC', 'CONCACAF'], 0],
  ['¿Qué color predomina en el uniforme de Túnez?', ['Rojo', 'Azul', 'Verde', 'Negro'], 0],
  ['¿Cuál ha sido el mejor resultado de Túnez en un Mundial?', ['Cuartos', 'Octavos', 'Fase de grupos', 'Semifinal'], 2],
  ['¿En qué año debutó Túnez en un Mundial?', ['1978', '1982', '1990', '2002'], 0],
  ['¿Qué jugador es la estrella actual de Egipto?', ['Mané', 'Salah', 'Drogba', 'Eto’o'], 1],
  ['¿Cuál es el apodo de la selección de Egipto?', ['Faraones', 'Guerreros', 'Leones', 'Águilas'], 0],
  ['¿A qué confederación pertenece Egipto?', ['CAF', 'UEFA', 'AFC', 'CONCACAF'], 0],
  ['¿Qué color usa la selección de Egipto?', ['Rojo', 'Azul', 'Verde', 'Negro'], 0],
  ['¿Qué logro tiene Egipto en África?', ['Más Copas África', 'Más Mundiales', 'Más Eurocopas', 'Más Confederaciones'], 0],
  ['¿Qué jugador famoso fue figura de Costa de Marfil?', ['Drogba', 'Salah', 'Mané', 'Eto’o'], 0],
  ['¿Cuál es el apodo de la selección de Costa de Marfil?', ['Elefantes', 'Leones', 'Guerreros', 'Tigres'], 0],
  ['¿A qué confederación pertenece Costa de Marfil?', ['CAF', 'UEFA', 'AFC', 'CONCACAF'], 0],
  ['¿Qué color predomina en el uniforme de Costa de Marfil?', ['Naranja', 'Azul', 'Verde', 'Negro'], 0],
  ['¿Cuál ha sido el mejor resultado de Costa de Marfil en Mundiales?', ['Cuartos', 'Octavos', 'Fase de grupos', 'Semifinal'], 2],
  ['¿Cuál es el apodo de la selección de Japón?', ['Samuráis Azules', 'Dragones', 'Guerreros', 'Tigres'], 0],
  ['¿A qué confederación pertenece Japón?', ['AFC', 'UEFA', 'CAF', 'CONMEBOL'], 0],
  ['¿Cuál ha sido el mejor resultado de Japón en Mundiales?', ['Cuartos', 'Octavos de final', 'Semifinal', 'Final'], 1],
  ['¿Qué color usa la selección de Japón?', ['Azul', 'Rojo', 'Verde', 'Negro'], 0],
  ['¿Qué caracteriza el juego de Japón?', ['Fuerza', 'Técnica', 'Defensa', 'Juego largo'], 1],
  ['¿Qué logró Corea del Sur en 2002?', ['Campeón', 'Subcampeón', 'Semifinales', 'Cuartos'], 2],
  ['¿Cuál es el apodo de la selección de Corea del Sur?', ['Tigres Asiáticos', 'Dragones', 'Guerreros', 'Leones'], 0],
  ['¿A qué confederación pertenece Corea del Sur?', ['AFC', 'UEFA', 'CAF', 'CONCACAF'], 0],
  ['¿Qué jugador es figura de Corea del Sur?', ['Son Heung-min', 'Kubo', 'Honda', 'Park'], 0],
  ['¿Qué color usa la selección de Corea del Sur?', ['Rojo', 'Azul', 'Verde', 'Negro'], 0],
  ['¿Cuál es el apodo de la selección de Irán?', ['Team Melli', 'Guerreros', 'Tigres', 'Leones'], 0],
  ['¿A qué confederación pertenece Irán?', ['AFC', 'UEFA', 'CAF', 'CONMEBOL'], 0],
  ['¿Qué color predomina en el uniforme de Irán?', ['Blanco', 'Azul', 'Rojo', 'Negro'], 0],
  ['¿Cuál ha sido el mejor resultado de Irán en Mundiales?', ['Cuartos', 'Octavos', 'Fase de grupos', 'Semifinal'], 2],
  ['¿En qué región se ubica Irán?', ['Europa', 'Medio Oriente', 'África', 'América'], 1],
  ['¿A qué selección venció Arabia Saudita en el Mundial 2022?', ['Brasil', 'Argentina', 'Francia', 'España'], 1],
  ['¿Cuál es el apodo de la selección de Arabia Saudita?', ['Halcones Verdes', 'Tigres', 'Guerreros', 'Leones'], 0],
  ['¿A qué confederación pertenece Arabia Saudita?', ['AFC', 'UEFA', 'CAF', 'CONCACAF'], 0],
  ['¿Qué color predomina en su uniforme?', ['Verde', 'Azul', 'Rojo', 'Negro'], 0],
  ['¿En qué región se ubica Arabia Saudita?', ['Europa', 'Medio Oriente', 'África', 'Oceanía'], 1],
  ['¿A qué confederación pertenece Australia actualmente?', ['OFC', 'AFC', 'UEFA', 'CAF'], 1],
  ['¿Cuál es el apodo de la selección de Australia?', ['Socceroos', 'Canguros', 'Guerreros', 'Tigres'], 0],
  ['¿Cuál ha sido el mejor resultado de Australia en un Mundial?', ['Cuartos', 'Octavos de final', 'Semifinal', 'Final'], 1],
  ['¿Qué colores usa Australia?', ['Verde y amarillo', 'Azul', 'Rojo', 'Negro'], 0],
  ['¿En qué continente está Australia?', ['Asia', 'Oceanía', 'Europa', 'América'], 1],
  ['¿En qué año organizó el Mundial Qatar?', ['2018', '2022', '2014', '2010'], 1],
  ['¿Cuál es el apodo de la selección de Qatar?', ['Granate', 'Guerreros', 'Tigres', 'Águilas'], 0],
  ['¿A qué confederación pertenece Qatar?', ['AFC', 'UEFA', 'CAF', 'CONMEBOL'], 0],
  ['¿Qué colores usa Qatar?', ['Blanco y vino', 'Azul', 'Verde', 'Negro'], 0],
  ['¿Qué torneo ganó recientemente Qatar?', ['Mundial', 'Copa Asia', 'Eurocopa', 'Copa América'], 1],
  ['¿Qué torneo ganó Irak en 2007?', ['Mundial', 'Copa Asia', 'Copa Oro', 'Eurocopa'], 1],
  ['¿Cuál es el apodo de la selección de Irak?', ['Leones de Mesopotamia', 'Tigres', 'Guerreros', 'Águilas'], 0],
  ['¿A qué confederación pertenece Irak?', ['AFC', 'UEFA', 'CAF', 'CONMEBOL'], 0],
  ['¿Qué color usa la selección de Irak?', ['Verde', 'Azul', 'Rojo', 'Negro'], 0],
  ['¿En qué región se ubica Irak?', ['Europa', 'Medio Oriente', 'África', 'América'], 1],
  ['¿En qué año participó Emiratos Árabes Unidos en un Mundial?', ['1986', '1990', '1994', '2002'], 1],
  ['¿Cuál es el apodo de la selección de Emiratos Árabes Unidos?', ['Blancos', 'Halcones', 'Guerreros del Desierto', 'Blancos del Golfo'], 3],
  ['¿A qué confederación pertenece Emiratos Árabes Unidos?', ['AFC', 'UEFA', 'CAF', 'CONCACAF'], 0],
  ['¿Qué colores usa la selección de Emiratos Árabes Unidos?', ['Blanco, rojo y verde', 'Azul', 'Negro', 'Amarillo'], 0],
  ['¿En qué región se ubica Emiratos Árabes Unidos?', ['Europa', 'Medio Oriente', 'África', 'Oceanía'], 1],
  ['¿A qué confederación pertenece Nueva Zelanda?', ['OFC', 'AFC', 'UEFA', 'CONMEBOL'], 0],
  ['¿Cuál es el apodo de la selección de Nueva Zelanda?', ['All Whites', 'Guerreros', 'Leones', 'Tigres'], 0],
  ['¿En qué año participó Nueva Zelanda en un Mundial reciente?', ['2006', '2010', '2014', '2018'], 1],
  ['¿Qué color usa la selección de Nueva Zelanda?', ['Blanco', 'Azul', 'Verde', 'Negro'], 0],
  ['¿En qué continente se ubica Nueva Zelanda?', ['Asia', 'Oceanía', 'Europa', 'América'], 1],
  ['¿En qué año volvió Perú a un Mundial recientemente?', ['2014', '2018', '2022', '2010'], 1],
  ['¿Cuál es el apodo de la selección de Perú?', ['Blanquirroja', 'Guerreros', 'Incas', 'Leones'], 0],
  ['¿A qué confederación pertenece Perú?', ['CONMEBOL', 'UEFA', 'CAF', 'AFC'], 0],
  ['¿Qué colores usa la selección de Perú?', ['Blanco y rojo', 'Azul', 'Verde', 'Negro'], 0],
  ['¿Qué jugador es histórico en Perú?', ['Guerrero', 'Messi', 'Neymar', 'Suárez'], 0],
  ['¿Cuál es el apodo de la selección de Paraguay?', ['Albirroja', 'Guerreros', 'Leones', 'Tigres'], 0],
  ['¿A qué confederación pertenece Paraguay?', ['CONMEBOL', 'UEFA', 'CAF', 'AFC'], 0],
  ['¿Cuál ha sido el mejor resultado de Paraguay en un Mundial?', ['Cuartos de final 2010', 'Semifinal', 'Final', 'Campeón'], 0],
  ['¿Qué colores usa la selección de Paraguay?', ['Rojo y blanco', 'Azul', 'Verde', 'Negro'], 0],
  ['¿Qué jugador histórico destacó en Paraguay?', ['Chilavert', 'Messi', 'Ronaldo', 'Zidane'], 0],
];

const QUESTIONS_PER_ROUND = 10;

const allQuestions: Question[] = rawQuestions.map(([question, options, correct], index) => ({
  id: index + 1,
  question,
  options,
  correct,
}));

const shuffleQuestions = (questions: Question[]) => {
  const shuffled = [...questions];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
};

const createQuestionRound = (usedQuestionIds: number[] = []) => {
  const usedQuestions = new Set(usedQuestionIds);
  const availableQuestions = allQuestions.filter((question) => !usedQuestions.has(question.id));
  const shouldResetUsedQuestions = availableQuestions.length < QUESTIONS_PER_ROUND;
  const questionSource = shouldResetUsedQuestions ? allQuestions : availableQuestions;
  const questions = shuffleQuestions(questionSource).slice(0, QUESTIONS_PER_ROUND);

  return {
    questions,
    usedQuestionIds: shouldResetUsedQuestions
      ? questions.map((question) => question.id)
      : [...usedQuestionIds, ...questions.map((question) => question.id)],
  };
};

export function Quiz() {
  const [questionRound, setQuestionRound] = useState(() => createQuestionRound());
  const questions = questionRound.questions;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    setShowResult(true);

    if (index === questions[currentQuestion].correct) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setQuestionRound((currentRound) => createQuestionRound(currentRound.usedQuestionIds));
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return '¡Perfecto! Eres un experto del Mundial 🏆';
    if (percentage >= 75) return '¡Excelente! Conoces muy bien el fútbol ⚽';
    if (percentage >= 50) return '¡Bien! Vas por buen camino 👍';
    return 'Sigue aprendiendo sobre el Mundial 📚';
  };

  if (quizComplete) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-black/60 backdrop-blur-lg rounded-2xl p-8 border border-purple-500 shadow-2xl">
            <div className="text-center">
              <Trophy className="w-24 h-24 text-purple-500 mx-auto mb-6 animate-bounce" />
              <h2 className="text-4xl font-black text-white mb-4">¡Quiz Completado!</h2>
              <p className="text-purple-300 text-xl mb-8">{getScoreMessage()}</p>

              <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 rounded-xl p-8 mb-8">
                <div className="text-6xl font-black text-white mb-2">
                  {score} / {questions.length}
                </div>
                <div className="text-purple-300 text-lg">Respuestas Correctas</div>
                <div className="flex justify-center gap-1 mt-4 flex-wrap">
                  {Array.from({ length: questions.length }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < score ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-full hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg mx-auto"
              >
                <RotateCcw className="w-5 h-5" />
                Jugar de Nuevo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Quiz Mundial 2026
          </h1>
          <p className="text-purple-300 text-lg">Demuestra tu conocimiento sobre el fútbol</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-purple-300 font-bold">
              Pregunta {currentQuestion + 1} de {questions.length}
            </span>
            <span className="text-purple-300 font-bold">
              Puntos: {score}
            </span>
          </div>
          <div className="w-full bg-purple-950/50 rounded-full h-3 overflow-hidden border border-purple-800">
            <div
              className="bg-gradient-to-r from-purple-600 to-purple-500 h-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-black/60 backdrop-blur-lg rounded-2xl p-8 border border-purple-500 shadow-2xl mb-6">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-8">
            {question.question}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correct;
              const showCorrect = showResult && isCorrect;
              const showIncorrect = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-5 rounded-xl font-bold text-left transition-all border-2 flex items-center justify-between gap-4 ${
                    showCorrect
                      ? 'bg-green-600 border-green-500 text-white'
                      : showIncorrect
                      ? 'bg-red-600 border-red-500 text-white'
                      : selectedAnswer === null
                      ? 'bg-purple-950/50 border-purple-800 text-white hover:bg-purple-900/50 hover:border-purple-600'
                      : 'bg-gray-900 border-gray-800 text-gray-500'
                  }`}
                >
                  <span className="text-lg">{option}</span>
                  {showCorrect && <Check className="w-6 h-6 shrink-0" />}
                  {showIncorrect && <X className="w-6 h-6 shrink-0" />}
                </button>
              );
            })}
          </div>

        </div>

        {showResult && (
          <div className="text-center">
            <button
              onClick={handleNext}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-full hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg"
            >
              {currentQuestion < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
