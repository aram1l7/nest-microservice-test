import tracer from 'dd-trace';

tracer.init({
  service: 'auth-service',
  logInjection: true,
});

export default tracer;
