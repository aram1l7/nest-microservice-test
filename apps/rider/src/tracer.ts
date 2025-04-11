import tracer from 'dd-trace';

tracer.init({
  service: 'rider-service',
  logInjection: true,
});

export default tracer;
