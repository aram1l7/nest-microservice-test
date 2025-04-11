import tracer from 'dd-trace';
import 'dotenv/config';

tracer.init({
  service: 'api-gateway',
  logInjection: true,
});

export default tracer;
