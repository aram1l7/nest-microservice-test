import tracer from 'dd-trace';

tracer.init({
  service: 'logging-service',
  logInjection: true,
});

export default tracer;
