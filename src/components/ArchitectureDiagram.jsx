const diagrams = {
  bidly: {
    nodes: [
      ['React clients', 8, 42], ['Nginx', 31, 42], ['Spring Boot × N', 54, 25],
      ['Redis Pub/Sub', 78, 25], ['PostgreSQL', 54, 68], ['WebSocket', 78, 68],
    ],
    paths: ['M20 48 H31', 'M41 48 L54 34', 'M69 31 H78', 'M62 39 V68', 'M68 33 Q82 44 78 68', 'M78 74 H92'],
  },
  shopmesh: {
    nodes: [
      ['React client', 7, 42], ['API Gateway', 28, 42], ['5 services', 51, 23],
      ['Kafka saga', 75, 23], ['3 MySQL schemas', 51, 69], ['Eureka', 75, 69],
    ],
    paths: ['M19 48 H28', 'M40 47 L51 33', 'M62 30 H75', 'M57 36 V69', 'M75 30 Q86 49 75 69', 'M75 75 H91'],
  },
  smartcoldmailer: {
    nodes: [
      ['React dashboard', 7, 42], ['Secure REST API', 31, 42], ['Campaign engine', 55, 23],
      ['SMTP provider', 79, 23], ['MongoDB', 55, 69], ['Tracking API', 79, 69],
    ],
    paths: ['M21 48 H31', 'M43 46 L55 33', 'M68 30 H79', 'M62 36 V69', 'M79 30 V69', 'M79 75 H92'],
  },
};

export default function ArchitectureDiagram({ type, title }) {
  const diagram = diagrams[type];
  return (
    <figure className="architecture" aria-label={`${title} architecture diagram`}>
      <div className="architecture__topline"><span>System map</span><span>Architecture / {type}</span></div>
      <svg viewBox="0 0 100 92" role="img">
        <title>{title} architecture</title>
        <g className="architecture__paths">
          {diagram.paths.map((path) => <path key={path} d={path} pathLength="1" />)}
        </g>
        {diagram.nodes.map(([label, x, y], index) => (
          <g className="architecture__node" key={label} transform={`translate(${x} ${y})`}>
            <rect width={index % 2 ? 15 : 16} height="12" rx="2" />
            <circle cx="3" cy="3" r="0.8" />
            <text x={index % 2 ? 7.5 : 8} y="7.5" textAnchor="middle">{label}</text>
          </g>
        ))}
      </svg>
      <figcaption>Animated flow illustrates service communication; it is not a deployment topology guarantee.</figcaption>
    </figure>
  );
}
