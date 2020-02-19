const technos = [
  new Techno({
    id: 'javascript',
    type: 'language',
    tags: ['JS'],
    title: 'JavaScript (JS)',
    desc:
      'Langage interprété par les navigateurs permettant d\'intéragir avec le DOM (Document Object Model).​\nChaque année de nouvelles normes et spécifications du JavaScript sont proposées et votées par la communauté puis instaurés par ECMAScript (ES).​\nOn parle souvent de "JavaScript ES6" car de nombreuses fonctionnalités très utilisées aujourd\'hui sont apparues sur cette version.​\n',
  }).toObject(),
  new Techno({
    id: 'typescript',
    type: 'language',
    tags: ['TS'],
    title: 'TypeScript (TS)',
    desc:
      "Surcouche de JavaScript apportant une syntaxe de typage statique, ce langage doit être transpilé afin d'être interprété par les navigateurs.​",
  }).toObject(),
  new Techno({
    id: 'html',
    type: 'language',
    tags: [],
    title: 'HyperText Markup Language (HTML)​',
    desc:
      'Langage de balise interprété par le navigateur permettant de créer le DOM.​',
  }).toObject(),
  new Techno({
    id: 'css',
    type: 'language',
    tags: ['CSS'],
    title: 'Cascading Style Sheets (CSS)​​',
    desc:
      "Langage interprété par les navigateurs permettant d'ajouter du style aux différents éléments du DOM.​​",
  }).toObject(),
  new Techno({
    id: 'sass',
    type: 'language',
    tags: ['CSS'],
    title: 'Sass',
    desc:
      "Sass est un préprocesseur CSS, il permet de structurer le code en ajoutant de nombreuses fonctionnalités telles que :\n-Utilisation de variables (pour utiliser la même couleur partout par exemble)\n-Permet d'imbriquer une déclaration dans une autre (enfant du sélecteur)\n-Suppression des déclarations en doublon",
  }).toObject(),
  new Techno({
    id: 'react',
    type: 'framework',
    tags: ['JS', 'TS'],
    title: 'React',
    desc:
      "Bibliothèque open-source créée et utilisée par Facebook, React peut être utilisé avec JavaScript ou bien TypeScript.\nReact utilise un DOM virtuel afin d'optimiser les performances lors des changements d'état de l'application.\nIl fonctionne par composants réutilisables que l'on imbrique avec un language nommé \"JSX\" (notation par balise, similaire au HTML). ",
  }).toObject(),
  new Techno({
    id: 'angular',
    type: 'framework',
    tags: ['TS'],
    title: 'Angular',
    desc:
      "Angular, également nommé Angular 2+, est un Framework open-source créé par Google, l'utilisation de TypeScript est fortement recommandée pour son utilisation.\nAngular a été entièrement repensé et réécrit après sa première version, c'est pourquoi on différencie bien Angular (V2+) de AngularJS (V1).​\nAngular n'utilise pas de DOM virtuel mais une détection des changements dans son modèle afin de mettre à jour le DOM de façon optimisée avec seulement les parties modifiées.​",
  }).toObject(),
  new Techno({
    id: 'vuejs',
    type: 'framework',
    tags: ['JS', 'TS'],
    title: 'Vue.JS',
    desc:
      'Framework open-source créé et maintenu par Evan-You et sa communauté.​\nCompatible avec TypeScript.​\nVue.JS utilise un DOM virtuel et un système de template très proche du HTML.​',
  }).toObject(),
  new Techno({
    id: 'bootstrap',
    type: 'framework',
    tags: ['CSS'],
    title: 'Bootstrap',
    desc:
      "Bootstrap est un framework CSS open-source créé par Twitter.​\nBootstrap apporte des composants js et classes CSS en mettant l'accent sur le responsive design, il est très utilisé pour concevoir et prototyper rapidement des sites web et interfaces d'administration mais ne doit pas l'être lors d'intégrations de maquettes graphiques plus complexes.",
  }).toObject(),
  new Techno({
    id: 'semantic',
    type: 'framework',
    tags: ['CSS'],
    title: 'SemanticUI',
    desc:
      'SemanticUI est un framework CSS open-source.​\nSimilaire à Bootstrap, il apporte des composants JS et des classes CSS, avec un style épuré.',
  }).toObject(),
  new Techno({
    id: 'nestjs',
    type: 'framework',
    tags: ['TS', 'NodeJS'],
    title: 'NestJS',
    desc:
      "NestJS est un framework open-source back-end utilisant NodeJS et TypeScript.​\nIl apporte une interface avec l'API de NodeJS et une architecture modulaire permettant de bien structurer son application.",
  }).toObject(),
  new Techno({
    id: 'nextjs',
    type: 'framework',
    tags: ['TS', 'JS', 'NodeJS'],
    title: 'NextJS',
    desc:
      "NextJS est un framework open-source back-end utilisant NodeJS et React.​\nIl permet d'utiliser React en SSR (Server-Side Rendering), c'est à dire de générer les pages html côté serveur plutôt que sur le client, ce qui a pour effet d'accélérer le rendu de la première page chargée par le client et d'optimiser le SEO",
  }).toObject(),
  new Techno({
    id: 'expressjs',
    type: 'framework',
    tags: ['TS', 'JS', 'NodeJS'],
    title: 'Express.js',
    desc:
      "Express.js est un framework open-source back-end utilisant NodeJS.​\nIl offre une API simple d'utilisation pour créer un serveur qui reçoit des requêtes HTTP.\nSon point fort est de rester proche de l'API de NodeJS sans ajouter de fonctionnalités superflues afin de conserver des performances optimales.",
  }).toObject(),
  new Techno({
    id: 'jest',
    type: 'test',
    tags: ['TS', 'JS'],
    title: 'Jest',
    desc:
      'Jest est un framework de test JavaScript créé par Facebook.\nIl apporte de nombreux outils de test permettant une bonne lisibilité du code.\nIl fonctionne bien avec des projets utilisant: Babel, TypeScript, Node.js, React, Angular ou Vue.js',
  }).toObject(),
  new Techno({
    id: 'mocha',
    type: 'test',
    tags: ['TS', 'JS'],
    title: 'Mocha',
    desc:
      "Mocha est un framework de test JavaScript open-source.\nIl apporte de nombreux outils de test, mais il ne dispose pas d'outils d'assertion, c'est pourquoi il est souvent associé à \"Chai\" qui apporte cela.\n",
  }).toObject(),
  new Techno({
    id: 'jasmine',
    type: 'test',
    tags: ['TS', 'JS'],
    title: 'Jasmine',
    desc:
      'Jasmine est un framework de test JavaScript open-source.\nIl apporte de nombreux outils de test avec une approche BDD (Behavior Driven Development)\n',
  }).toObject(),
  new Techno({
    id: 'vscode',
    type: 'software',
    tags: ['TS', 'JS'],
    title: 'VS Code (Visual Studio Code)',
    desc:
      "VS Code est un IDE (Integrated Development Environment) gratuit développé par Microsoft apportant de nombreuses fonctionnalités simplifiant l'écriture de code (autocomplétion, intégration de linter, nombreux plugins).\nIl supporte un très grand nombre de langages (fonctionne également pour le Java mais un IDE spécialisé comme IntelliJ Idea est préférable).\nA ne pas confondre avec Visual Studio qui est un autre IDE",
  }).toObject(),
  new Techno({
    id: 'intellijidea',
    type: 'software',
    tags: ['Java'],
    title: 'IntelliJ Idea',
    desc:
      "IntelliJ Idea est un IDE (Integrated Development Environment) développé par JetBrains très performant pour l'écriture de code Java.\nIl dispose d'une version communautaire gratuite et open-source ainsi qu'une autre, payante apportant plus de fonctionnalités.",
  }).toObject(),
  new Techno({
    id: 'nodejs',
    type: 'software',
    tags: ['TS', 'JS'],
    title: 'NodeJS',
    desc:
      "Node.js est une plateforme logicielle open-source en JavaScript.\nElle utilise la machine virtuelle V8 (créée par Google) qui permet d'éxécuter le javacript dans un environnement autre que celui du navigateur.\nNodeJS permet alors d'interpréter du code javascript côté serveur et de concevoir des application réseau performantes permettant une scalabilité horizontale.",
  }).toObject(),
  new Techno({
    id: 'git',
    type: 'software',
    tags: [],
    title: 'Git',
    desc:
      'Git est un logiciel open-source de gestion de versions (VCS, Version Control System ou encore SCM, Source Code Management).\nIl a été créé par Linus Torvalds, auteur du noyau Linux.\nIl est actuellement le VCS le plus utilisé devant SVN, Mercurial ou encore CVS.',
  }).toObject(),
  new Techno({
    id: 'firebase',
    type: 'software',
    tags: ['SaaS'],
    title: 'Firebase',
    desc:
      "Firebase est un ensemble de services cloud proposant, entre autres :\n-un service d'hébergement de site (Firebase Hosting).\n-des bases de données scalables et interactives (Cloud Firestore, Realtime Database).\n-des services d'analyse de traffic et de rapports d'erreur (Firebase Analytics).\n-des fonctions serverless (Cloud Functions).\nFirebase fût racheté par Google en 2014, combinant certains services avec Google Cloud Platform.",
  }).toObject(),
  new Techno({
    id: 'gcp',
    type: 'software',
    tags: ['SaaS'],
    title: 'Google Cloud Platform',
    desc:
      "Google Cloud Platform est une plateforme de cloud computing fournie par Google, proposant de nombreux services tels que : \n-Un service de déploiement d'applications rapide et scalable (App Engine).\n-Du stockage de données (Bucket Cloud Storage).\n-Un service d'ingestion d'événements (Cloud Pub/Sub).\nGoogle utilise cette même infrastructure en interne pour des produits tels que son moteur de recherche.",
  }).toObject(),
  new Techno({
    id: 'aws',
    type: 'software',
    tags: ['SaaS'],
    title: 'Amazon Web Services',
    desc:
      "Amazon Web Services est une division du groupe américain Amazon, spécialisée dans les services de cloud computing à la demande pour les entreprises et particuliers.\nAWS propose sensiblement les mêmes services que GCP/Firebase (stockage, conteneurs d'applications, BDD, applications serverless...).",
  }).toObject(),
  new Techno({
    id: 'jira',
    type: 'software',
    tags: ['SaaS'],
    title: 'Jira',
    desc:
      "Jira est une suite de logiciels de suivi de bugs, de gestion des incidents, et de gestion de projets orientés Agile, développé par Atlassian.\nIl est disponible en version SaaS avec une version gratuite pour 10 utilisateurs max, ainsi qu'en licenses serveur",
  }).toObject(),
];
