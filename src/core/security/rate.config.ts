const rateConfig = [
  {
    name: "short",
    ttl: (1 * 60 * 1000), // 1 minuto
    limit: 1000
  },
  {
    name: "medium",
    ttl: (5 * 60 * 1000), // 5 minutos
    limit: 1500
  },
  {
    name: "log",
    ttl: (10 * 60 * 1000), // 10 minutos
    limit: 2000
  }
];

export { rateConfig };