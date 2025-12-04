const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '55cf58e7G&',
    database: process.env.DB_NAME || 'midb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
```

**backend/.env**:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tupassword
DB_NAME=midb
JWT_SECRET=tu_clave_secreta