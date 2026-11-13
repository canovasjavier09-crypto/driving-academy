/**
 * Preguntas de estilo examen (situaciones de tráfico y respuestas trampa
 * típicas). Redacción original; ninguna es una pregunta oficial de la DGT.
 * Todas citan la norma que las respalda. Si no hay certeza sobre el artículo
 * exacto o una cifra, se indica en `verify` («VERIFICAR») en vez de afirmarlo.
 *
 * Abreviaturas: RGC = Reglamento General de Circulación (RD 1428/2003);
 * LSV = Ley sobre Tráfico, Circulación de Vehículos a Motor y Seguridad Vial
 * (RDL 6/2015); RGCond = Reglamento General de Conductores (RD 818/2009);
 * RGV = Reglamento General de Vehículos (RD 2822/1998).
 */
import { q } from './helpers';
import type { Question } from './types';

const v = (question: Question, verify: string): Question => ({ ...question, verify });

export const BANK_5: Question[] = [
  // ───────────── Velocidad ─────────────
  q('EXA-01', 'velocidad', 2, 'Circula con un turismo por una carretera convencional sin señalización de velocidad. ¿Por debajo de qué velocidad estaría circulando de forma anormalmente lenta, salvo que las circunstancias lo justifiquen?', ['45 km/h.', '60 km/h.', '30 km/h.'],
    'Salvo causa justificada, no se puede circular a una velocidad inferior a la mitad de la genérica de la vía. En convencional, la genérica de un turismo es 90 km/h, así que la mínima es 45 km/h. Los 60 km/h son la mínima en autopista y autovía (trampa habitual).', 'RGC arts. 48 y 49'),
  q('EXA-02', 'velocidad', 3, 'Va a adelantar a un camión lento en una carretera convencional limitada a 90 km/h. ¿Puede superar ese límite mientras dura el adelantamiento?', ['No, en ningún caso.', 'Sí, hasta 20 km/h más.', 'Sí, solo si el camión circula a menos de 70 km/h.'],
    'La posibilidad de superar en 20 km/h el límite para adelantar en convencionales se suprimió. Hoy no se puede rebasar el límite en ningún caso, tampoco para adelantar.', 'RGC art. 48 (modificado por RD 970/2020)'),
  q('EXA-03', 'velocidad', 2, 'Entra en una zona señalizada como «zona residencial» (señal S-28). ¿A qué velocidad máxima puede circular?', ['20 km/h.', '30 km/h.', '10 km/h.'],
    'En las zonas residenciales la velocidad máxima es de 20 km/h; los peatones pueden usar toda la zona y los juegos infantiles están permitidos. Los conductores deben extremar la precaución.', 'RGC art. 159 (señal S-28)'),

  // ───────────── Alcohol y drogas ─────────────
  q('EXA-04', 'alcohol-drogas', 2, 'Tiene el permiso B desde hace 18 meses. ¿Cuál es la tasa máxima de alcohol en sangre con la que puede conducir?', ['0,3 gramos por litro.', '0,5 gramos por litro.', '0,15 gramos por litro.'],
    'Durante los dos años siguientes a obtener el permiso, el límite es de 0,3 g/l en sangre (0,15 mg/l en aire espirado). La cifra de 0,15 corresponde al aire, no a la sangre: es la trampa típica.', 'RGC art. 20'),
  q('EXA-05', 'alcohol-drogas', 2, 'Un conductor con 10 años de experiencia se somete a un control. ¿Cuál es su tasa máxima de alcohol en sangre?', ['0,5 gramos por litro.', '0,25 gramos por litro.', '0,3 gramos por litro.'],
    'Para conductores generales, el límite es 0,5 g/l en sangre o 0,25 mg/l en aire espirado. Confundir 0,25 (aire) con sangre es un error frecuente.', 'RGC art. 20'),
  q('EXA-06', 'alcohol-drogas', 3, 'Fumó cannabis hace dos días y ya no nota ningún efecto. Si en un control la prueba de drogas da positivo, ¿comete una infracción?', ['Sí, está prohibido conducir con presencia de drogas en el organismo.', 'No, porque ya no está bajo sus efectos.', 'Solo si además supera la tasa de alcohol.'],
    'La norma prohíbe conducir con presencia de drogas en el organismo, se noten o no sus efectos. Solo se exceptúan las sustancias usadas bajo prescripción facultativa y con finalidad terapéutica, si se está en condiciones de conducir.', 'LSV art. 14'),

  // ───────────── Normas de circulación ─────────────
  q('EXA-07', 'normas', 2, 'Está detenido en un semáforo en rojo con el motor en marcha. ¿Puede consultar el teléfono móvil sujetándolo con la mano?', ['No, sigue conduciendo y está prohibido usarlo con la mano.', 'Sí, porque el vehículo está parado.', 'Sí, si el semáforo tarda más de un minuto.'],
    'Detenerse en un semáforo forma parte de la circulación: se sigue conduciendo. Está prohibido utilizar el móvil sujetándolo con la mano; solo se permite si la comunicación se hace sin emplear las manos ni usar cascos o auriculares.', 'RGC art. 18.2'),
  q('EXA-08', 'normas', 2, '¿Está permitido conducir escuchando música con auriculares conectados al teléfono?', ['No, está prohibido.', 'Sí, si el volumen es bajo.', 'Sí, si solo se usa un auricular.'],
    'Se prohíbe conducir con cascos o auriculares conectados a aparatos receptores o reproductores de sonido. Usar un solo auricular no lo convierte en legal.', 'RGC art. 18.2'),
  q('EXA-09', 'normas', 2, 'Un agente de tráfico levanta el brazo verticalmente. ¿Qué significa?', ['Atención, alto para todos los que se aproximen, salvo quienes no puedan detenerse con seguridad.', 'Que solo deben detenerse los vehículos que vienen de frente.', 'Que puede continuar con precaución.'],
    'El brazo levantado verticalmente obliga a detenerse a todos los usuarios que se aproximen al agente, excepto a los conductores que ya no puedan hacerlo en condiciones de seguridad suficientes.', 'RGC art. 143'),
  q('EXA-10', 'normas', 3, 'Un agente tiene los brazos extendidos horizontalmente y usted se le acerca por la espalda, en una dirección que corta la línea de sus brazos. ¿Qué debe hacer?', ['Detenerse.', 'Continuar, porque el agente le da la espalda.', 'Girar obligatoriamente a la derecha.'],
    'Con uno o ambos brazos extendidos horizontalmente, deben detenerse los usuarios que se acerquen al agente desde direcciones que corten la indicada por los brazos, tanto de frente como por detrás.', 'RGC art. 143'),
  q('EXA-11', 'senales', 3, 'En una intersección hay a la vez una señal de STOP y un semáforo en verde para usted. ¿Qué debe hacer?', ['Pasar, porque el semáforo prevalece sobre la señal vertical.', 'Detenerse, porque el STOP siempre prevalece.', 'Detenerse y esperar a que el semáforo cambie a amarillo.'],
    'El orden de prioridad es: agentes, señalización circunstancial, semáforos, señales verticales y marcas viales. Si el semáforo funciona, prevalece sobre el STOP (que rige cuando el semáforo está apagado o en amarillo intermitente).', 'RGC art. 133'),

  // ───────────── Prioridad ─────────────
  q('EXA-12', 'prioridad', 2, 'Llega a una intersección sin señalizar. Por su derecha se aproxima un ciclista. ¿Quién tiene prioridad?', ['El ciclista, porque viene por la derecha.', 'Usted, porque conduce un vehículo de motor.', 'Quien llegue primero.'],
    'En intersecciones sin señalizar se cede el paso a los vehículos que se aproximan por la derecha, sean del tipo que sean (con las excepciones de la norma, como los vehículos sobre raíles o la vía pavimentada).', 'RGC art. 57'),
  q('EXA-13', 'prioridad', 2, 'Va a entrar en una glorieta. Por su izquierda, ya dentro de ella, circula un vehículo. ¿Quién tiene preferencia?', ['El vehículo que circula dentro de la glorieta.', 'Usted, porque el otro vehículo viene por su izquierda.', 'El que tenga más carriles.'],
    'En las glorietas, los vehículos que se encuentran dentro tienen preferencia sobre los que pretenden acceder, aunque estos vengan por la derecha de aquellos. Es una excepción a la regla de la derecha.', 'RGC art. 57.1.c'),
  q('EXA-14', 'prioridad', 2, 'Una ambulancia con las señales luminosas y acústicas encendidas se acerca por detrás en una calle con un carril por sentido. ¿Qué hace?', ['Facilitarle el paso apartándose a la derecha y deteniéndose si es necesario, sin crear peligro.', 'Acelerar para dejarle la calle libre cuanto antes.', 'Pasar el semáforo en rojo para dejarle sitio, aunque haya peatones.'],
    'Ante un vehículo prioritario en servicio de urgencia hay que facilitarle el paso, apartándose normalmente a la derecha o deteniéndose. Nunca de forma que se cree un peligro para otros usuarios, como saltarse un semáforo con peatones cruzando.', 'RGC arts. 67 y 69'),

  // ───────────── Distancia y seguridad vial ─────────────
  q('EXA-15', 'seguridad-vial', 2, 'Circula detrás de otro vehículo sin intención de adelantarle. ¿Qué distancia debe mantener?', ['La que le permita detenerse sin chocar si el de delante frena de forma brusca.', 'Siempre 50 metros.', 'La mitad de la velocidad en metros, solo de noche.'],
    'La norma no fija una cifra general: exige una separación que permita detenerse en caso de frenado brusco sin colisionar, teniendo en cuenta la velocidad, la adherencia y los frenos. Las reglas de «2 segundos» son prácticas, no legales.', 'RGC art. 54'),
  q('EXA-16', 'seguridad-vial', 2, 'Presencia un accidente en el que hay heridos. Usted no está implicado. ¿Tiene alguna obligación?', ['Sí, auxiliar a las víctimas o pedir auxilio y colaborar para evitar mayores peligros, sin crearlos.', 'No, solo los implicados deben actuar.', 'Solo avisar a su compañía de seguros.'],
    'Los usuarios implicados en un accidente, los que lo presencien o tengan conocimiento de él están obligados a auxiliar o solicitar auxilio para atender a las víctimas, prestar su colaboración para evitar mayores peligros y, si lo pide la autoridad, colaborar.', 'RGC art. 129'),
  q('EXA-17', 'seguridad-vial', 1, 'Su turismo queda inmovilizado en la calzada de una autovía. ¿Qué dispositivo debe usar para señalizarlo en 2026?', ['La luz de emergencia V-16 conectada, colocada en la parte más alta del vehículo.', 'Los dos triángulos, a 50 metros por detrás y por delante.', 'Solo las luces de emergencia del vehículo.'],
    'Desde el 1 de enero de 2026 los triángulos dejan de ser válidos para señalizar un vehículo inmovilizado: se usa la V-16 conectada, que puede colocarse sin bajar del vehículo. También se encienden las luces de emergencia.', 'RD 159/2021 y RGC art. 130'),

  // ───────────── Adelantamientos ─────────────
  v(q('EXA-18', 'adelantamientos', 3, 'En una calle de poblado con dos carriles por sentido delimitados, el vehículo del carril izquierdo circula más despacio que usted, que va por el derecho. ¿Es un adelantamiento antirreglamentario pasarle?', ['No; en poblado, con carriles delimitados, circular más rápido por el derecho no se considera adelantamiento prohibido.', 'Sí, siempre se adelanta por la izquierda.', 'Solo es correcto si el otro vehículo es un autobús.'],
    'En vías con al menos dos carriles por sentido en poblado, y cuando la densidad de circulación hace que los vehículos vayan en filas, que una fila avance más rápido que otra no se considera adelantamiento por la derecha.', 'RGC art. 82'), 'VERIFICAR el apartado exacto del art. 82 RGC sobre filas de vehículos en poblado.'),
  v(q('EXA-19', 'adelantamientos', 2, 'Va a adelantar a un ciclista en una carretera con un solo carril por sentido. ¿Qué es correcto?', ['Dejar al menos 1,5 metros de separación lateral, pudiendo ocupar parcialmente el carril contrario si es seguro.', 'Basta con 1 metro si el ciclista va por el arcén.', 'Tocar el claxon y adelantar sin cambiar de trayectoria.'],
    'Al adelantar a ciclistas fuera de poblado se debe dejar una separación lateral mínima de 1,5 metros. Está permitido invadir parcialmente el sentido contrario (incluso con línea continua) cuando la maniobra pueda hacerse sin peligro.', 'RGC art. 85'), 'VERIFICAR el apartado que permite rebasar la línea continua al adelantar a ciclistas.'),
  q('EXA-20', 'adelantamientos', 2, 'Delante de un paso para peatones señalizado, el vehículo que le precede se ha detenido para dejar cruzar. ¿Puede adelantarle?', ['No, está prohibido adelantar en los pasos para peatones señalizados.', 'Sí, si no ve peatones por su lado.', 'Sí, si lo hace despacio.'],
    'Está prohibido adelantar en los pasos para peatones señalizados como tales. Además, el vehículo detenido puede estar tapando a un peatón que cruza.', 'RGC art. 87'),

  // ───────────── Parada y estacionamiento ─────────────
  q('EXA-21', 'parada-estacionamiento', 2, '¿Puede detenerse un momento en un carril reservado para autobuses para recoger a un pasajero?', ['No, está prohibido parar y estacionar en los carriles reservados al transporte público.', 'Sí, si no tarda más de dos minutos.', 'Sí, si deja encendidas las luces de emergencia.'],
    'En los carriles o partes de la vía reservados para el transporte público está prohibido tanto parar como estacionar. Encender las luces de emergencia no autoriza la detención.', 'RGC art. 94'),
  q('EXA-22', 'parada-estacionamiento', 1, '¿Qué diferencia hay entre parada y estacionamiento?', ['La parada dura menos de dos minutos y el conductor no abandona el vehículo.', 'La parada solo puede hacerse de día.', 'No hay diferencia: son lo mismo.'],
    'Parada es la inmovilización de un vehículo durante un tiempo inferior a dos minutos, sin que el conductor pueda abandonarlo. Estacionamiento es toda inmovilización que no sea detención (por necesidad de la circulación) ni parada.', 'LSV Anexo I'),

  // ───────────── Documentación y permiso ─────────────
  q('EXA-23', 'documentacion', 2, 'Con el permiso B, ¿cuántas plazas puede tener como máximo el vehículo que conduzca, incluida la del conductor?', ['9.', '7.', '12.'],
    'El permiso B autoriza a conducir automóviles de masa máxima autorizada no superior a 3.500 kg diseñados para el transporte de no más de ocho pasajeros además del conductor (9 plazas en total).', 'RGCond art. 4'),
  v(q('EXA-24', 'documentacion', 2, 'Un conductor novel no pierde ningún punto durante sus dos primeros años de permiso. ¿Qué ocurre?', ['Pasa a tener 12 puntos.', 'Mantiene los 8 puntos hasta que cumpla cinco años.', 'Obtiene directamente 15 puntos.'],
    'Los conductores con menos de tres años de antigüedad parten de 8 puntos y, si no pierden puntos en los dos primeros años, pasan a tener 12. El saldo máximo (15) se alcanza con años sin infracciones.', 'LSV, permiso por puntos (art. 63 y Anexo II)'), 'VERIFICAR el número de artículo de la LSV que regula el saldo inicial de puntos.'),
  v(q('EXA-25', 'documentacion', 2, 'La ITV de su turismo ha resultado desfavorable. ¿Puede seguir usándolo con normalidad hasta la próxima revisión periódica?', ['No; solo puede usarlo para llevarlo a reparar y volver a la ITV dentro del plazo que se le conceda.', 'Sí, hasta la fecha de la siguiente ITV.', 'Sí, si tiene el seguro en vigor.'],
    'Con una inspección desfavorable el vehículo solo puede circular para ir al taller y volver a la estación de ITV, dentro del plazo concedido para corregir los defectos. Con resultado negativo no puede circular por sus propios medios.', 'RD 920/2017 (ITV)'), 'VERIFICAR el plazo exacto (en meses) y el artículo del RD 920/2017.'),

  // ───────────── Seguridad activa y pasiva ─────────────
  q('EXA-26', 'seguridad-activa-pasiva', 3, 'Quiere llevar a un bebé en una silla orientada hacia atrás en el asiento delantero. El airbag frontal del acompañante está activado. ¿Qué es correcto?', ['No puede hacerlo: hay que desactivar el airbag antes de instalar la silla.', 'Puede hacerlo si la silla está homologada.', 'Puede hacerlo si el trayecto es urbano.'],
    'Está prohibido utilizar un sistema de retención orientado hacia atrás en un asiento protegido por un airbag frontal, salvo que el airbag se haya desactivado. El airbag podría golpear la silla con gran fuerza.', 'RGC art. 117'),
  v(q('EXA-27', 'seguridad-activa-pasiva', 2, 'Una conductora embarazada, ¿está exenta de usar el cinturón de seguridad por estar embarazada?', ['No; solo quedan exentas las personas con un certificado médico que lo justifique.', 'Sí, a partir del sexto mes.', 'Sí, en vías urbanas.'],
    'El embarazo por sí solo no exime del cinturón. Las exenciones están tasadas (por ejemplo, certificado médico por razones graves). Se recomienda pasar la banda inferior por debajo del vientre, sobre la pelvis.', 'RGC art. 119'), 'VERIFICAR la redacción exacta de las exenciones del art. 119 RGC.'),

  // ───────────── Mecánica (estado del vehículo) ─────────────
  v(q('EXA-28', 'mecanica', 2, 'Los neumáticos de su turismo tienen un dibujo de 1,2 mm de profundidad en las ranuras principales. ¿Qué ocurre?', ['Están por debajo del mínimo legal de 1,6 mm y no puede circular con ellos.', 'Es correcto, el mínimo es 1 mm.', 'Solo es infracción en invierno.'],
    'La profundidad mínima de las ranuras principales del dibujo es de 1,6 mm. Con menos, la evacuación del agua empeora mucho (riesgo de aquaplaning) y el vehículo no cumple las condiciones para circular.', 'RGV (RD 2822/1998), Anexo sobre neumáticos'), 'VERIFICAR el número de anexo del RGV que fija los 1,6 mm.'),
  v(q('EXA-29', 'mecanica', 2, 'Se le enciende en marcha el testigo rojo de los frenos y el pedal se hunde más de lo normal. ¿Qué hace?', ['Detenerse en un lugar seguro y no continuar hasta revisar el sistema.', 'Continuar hasta casa frenando con el freno de mano.', 'Ignorarlo si el coche aún frena.'],
    'Un fallo de frenos compromete la seguridad: el conductor está obligado a mantener el vehículo en condiciones de circular sin peligro. Con un testigo rojo de frenos, lo correcto es detenerse en un lugar seguro y pedir asistencia.', 'RGC art. 10 (deber de diligencia)'), 'VERIFICAR: el artículo citado establece el deber general de no poner en peligro; el diagnóstico de la avería es didáctico.'),

  // ───────────── Usuarios vulnerables ─────────────
  q('EXA-30', 'usuarios-vulnerables', 2, 'Gira a la derecha con el semáforo en verde. Un peatón cruza la calle a la que se incorpora con su semáforo también en verde. ¿Quién tiene prioridad?', ['El peatón.', 'Usted, porque tiene el semáforo en verde.', 'Quien entró antes en la intersección.'],
    'Al girar para entrar en otra vía, los conductores deben ceder el paso a los peatones que la estén cruzando, aunque no haya paso para peatones. Los dos semáforos en verde no cambian esta obligación.', 'RGC art. 65'),

  // ───────────── Autopistas y autovías ─────────────
  q('EXA-31', 'autopistas-autovias', 2, 'Circula por el carril de aceleración para entrar en una autovía y no hay hueco. ¿Qué debe hacer?', ['Adaptar la velocidad y, si es necesario, detenerse al final del carril hasta que pueda incorporarse sin peligro.', 'Incorporarse igualmente: los que circulan deben dejarle sitio.', 'Circular por el arcén hasta encontrar un hueco.'],
    'Quien se incorpora debe ceder el paso a los vehículos que circulan por la vía. Los que circulan por ella deben facilitar la maniobra si pueden, pero la obligación de ceder es de quien entra.', 'RGC art. 72'),
  q('EXA-32', 'autopistas-autovias', 1, 'En una autovía, ¿cuál es la velocidad máxima genérica de un turismo?', ['120 km/h.', '130 km/h.', '100 km/h.'],
    'La velocidad máxima genérica de turismos y motocicletas en autopistas y autovías es de 120 km/h, salvo que la señalización indique otra.', 'RGC art. 48'),
];
