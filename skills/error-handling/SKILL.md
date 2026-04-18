---
name: error-handling
description: "Standar error handling — taksonomi error, centralized handler, error response mapping, dan aturan keamanan error."
version: "1.0.0"
---

# 🚨 Error Handling Skill — Typed Errors & Centralized Mapping

> Melengkapi Engineering Supreme Law Section 7.
> Skill ini berisi TAKSONOMI LENGKAP dan TEMPLATE IMPLEMENTASI.

================================================================
## TAKSONOMI ERROR — HIERARKI WAJIB
================================================================

```
AppError (base class)
├── DomainError (bisnis logic gagal)
│   ├── ValidationError       → 422 Unprocessable
│   ├── BusinessRuleError     → 422 Unprocessable
│   ├── NotFoundError         → 404 Not Found
│   ├── ConflictError         → 409 Conflict
│   └── ForbiddenError        → 403 Forbidden
├── InfraError (sistem/infra gagal)
│   ├── DatabaseError         → 503 Service Unavailable
│   ├── ExternalServiceError  → 502 Bad Gateway
│   ├── TimeoutError          → 504 Gateway Timeout
│   └── ConnectionError       → 503 Service Unavailable
└── AuthError (otentikasi gagal)
    ├── UnauthorizedError     → 401 Unauthorized
    └── TokenExpiredError     → 401 Unauthorized
```

================================================================
## IMPLEMENTASI BASE CLASS
================================================================

```javascript
// shared/errors/app-error.js

class AppError extends Error {
  constructor({
    message,
    code,
    statusCode,
    details = null,
    isOperational = true,
  }) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

// --- Domain Errors ---

class ValidationError extends AppError {
  constructor(details) {
    super({
      message: 'Validasi gagal',
      code: 'VALIDATION_ERROR',
      statusCode: 422,
      details,
    });
  }
}

class NotFoundError extends AppError {
  constructor(resource, id) {
    super({
      message: `${resource} dengan ID ${id} tidak ditemukan`,
      code: 'NOT_FOUND',
      statusCode: 404,
    });
  }
}

class ConflictError extends AppError {
  constructor(message) {
    super({
      message,
      code: 'CONFLICT',
      statusCode: 409,
    });
  }
}

class BusinessRuleError extends AppError {
  constructor(message, details = null) {
    super({
      message,
      code: 'BUSINESS_RULE_VIOLATION',
      statusCode: 422,
      details,
    });
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Akses ditolak') {
    super({
      message,
      code: 'FORBIDDEN',
      statusCode: 403,
    });
  }
}

// --- Infra Errors ---

class DatabaseError extends AppError {
  constructor(message) {
    super({
      message,
      code: 'DATABASE_ERROR',
      statusCode: 503,
      isOperational: false,
    });
  }
}

class ExternalServiceError extends AppError {
  constructor(serviceName, originalError) {
    super({
      message: `Service ${serviceName} tidak merespons`,
      code: 'EXTERNAL_SERVICE_ERROR',
      statusCode: 502,
      details: { service: serviceName },
    });
  }
}

// --- Auth Errors ---

class UnauthorizedError extends AppError {
  constructor(message = 'Autentikasi diperlukan') {
    super({
      message,
      code: 'UNAUTHORIZED',
      statusCode: 401,
    });
  }
}

module.exports = {
  AppError,
  ValidationError,
  NotFoundError,
  ConflictError,
  BusinessRuleError,
  ForbiddenError,
  DatabaseError,
  ExternalServiceError,
  UnauthorizedError,
};
```

================================================================
## CENTRALIZED ERROR HANDLER — MIDDLEWARE
================================================================

```javascript
// shared/middleware/error-handler.js

const { AppError } = require('../errors/app-error');
const { getTrace } = require('./tracing');
const logger = require('../logger');

function errorHandler(err, req, res, next) {
  const { traceId, requestId } = getTrace();

  // Jika ini AppError (operational) → response terstruktur
  if (err instanceof AppError && err.isOperational) {
    logger.warn({
      traceId,
      module: 'error-handler',
      action: 'operational_error',
      message: err.message,
      code: err.code,
      statusCode: err.statusCode,
    });

    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        details: err.details || undefined,
      },
      meta: { requestId, timestamp: new Date().toISOString() },
    });
  }

  // Jika bukan AppError → bug / unexpected error
  logger.error({
    traceId,
    module: 'error-handler',
    action: 'unexpected_error',
    message: err.message,
    stack: err.stack,
  });

  // JANGAN expose detail ke client
  return res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Terjadi kesalahan internal',
    },
    meta: { requestId, timestamp: new Date().toISOString() },
  });
}

module.exports = { errorHandler };
```

================================================================
## ATURAN ERROR HANDLING
================================================================

WAJIB:
  1. SELALU gunakan typed error (bukan throw new Error('...'))
  2. SELALU tangkap di centralized handler (bukan try-catch per route)
  3. SELALU log error dengan traceId
  4. SELALU bedakan operational vs programming error
  5. SELALU return response shape yang konsisten (lihat API Design Skill)

DILARANG:
  1. DILARANG empty catch: catch(e) { } ← FATAL
  2. DILARANG expose stack trace ke client di production
  3. DILARANG log dan throw (pilih salah satu):
     ❌ catch(e) { logger.error(e); throw e; }  ← double log
     ✅ catch(e) { throw new DatabaseError(e.message); }
  4. DILARANG return error sebagai status 200
  5. DILARANG hardcode status code di controller:
     ❌ res.status(422).json({ error: '...' })
     ✅ throw new ValidationError([...])

================================================================
## POLA DI SETIAP LAYER
================================================================

CONTROLLER (tipis — hanya catch dan forward):
```javascript
async function createUser(req, res, next) {
  try {
    const result = await userService.create(req.body);
    return res.status(201).json({ data: result });
  } catch (error) {
    next(error); // Forward ke centralized handler
  }
}
```

SERVICE (throw typed error):
```javascript
async function create(input) {
  const existing = await userRepo.findByEmail(input.email);
  if (existing) {
    throw new ConflictError(
      `Email ${input.email} sudah terdaftar`
    );
  }
  return userRepo.create(input);
}
```

REPOSITORY (wrap DB error):
```javascript
async function create(data) {
  try {
    return await prisma.user.create({ data });
  } catch (error) {
    if (error.code === 'P2002') {
      throw new ConflictError('Duplikasi data');
    }
    throw new DatabaseError(error.message);
  }
}
```
