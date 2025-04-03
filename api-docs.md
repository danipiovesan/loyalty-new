## API Pio Doze Odontologia - Programa de Fidelidade

### Base URL
`/api/v1`

### Autenticação
Todas as requisições devem incluir o header:
```
Authorization: Bearer <token>
```

### Endpoints

#### Pacientes

##### Criar Paciente
```http
POST /patients
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "cpf": "string",
  "birthDate": "string (YYYY-MM-DD)",
  "phone": "string",
  "termsAccepted": boolean,
  "termsAcceptedDate": "string (YYYY-MM-DD HH:mm:ss)"
}

Response (201 Created):
{
  "id": "string",
  "name": "string",
  "email": "string",
  "cpf": "string",
  "points": number,
  "level": "string",
  "termsAccepted": boolean,
  "termsAcceptedDate": "string"
}
```

##### Buscar Paciente
```http
GET /patients/{cpf}

Response (200 OK):
{
  "id": "string",
  "name": "string",
  "email": "string",
  "cpf": "string",
  "points": number,
  "level": "string",
  "termsAccepted": boolean,
  "pointsHistory": [
    {
      "id": "string",
      "points": number,
      "type": "string",
      "description": "string",
      "date": "string"
    }
  ]
}
```

##### Adicionar Pontos (Webhook)
```http
POST /webhooks/points
Content-Type: application/json

{
  "cpf": "string",
  "points": number,
  "type": "string" (VISIT|PROCEDURE|FAMILY_BONUS|BIRTHDAY|SOCIAL_MEDIA),
  "description": "string",
  "procedureId": "string" (opcional),
  "procedureValue": number (opcional)
}

Response (200 OK):
{
  "success": boolean,
  "newPoints": number,
  "newLevel": "string"
}
```

#### Resgates

##### Solicitar Resgate
```http
POST /redemptions
Content-Type: application/json

{
  "patientId": "string",
  "rewardId": "string"
}

Response (201 Created):
{
  "id": "string",
  "status": "PENDING",
  "createdAt": "string",
  "reward": {
    "id": "string",
    "name": "string",
    "points": number
  }
}
```

##### Listar Resgates do Paciente
```http
GET /patients/{patientId}/redemptions

Response (200 OK):
[
  {
    "id": "string",
    "status": "string",
    "createdAt": "string",
    "reward": {
      "id": "string",
      "name": "string",
      "points": number
    }
  }
]
```

#### Regras do Programa

##### Buscar Regras Atuais
```http
GET /loyalty/rules

Response (200 OK):
{
  "pointsPerVisit": number,
  "regularityBonus": number,
  "familyMultiplier": number,
  "birthdayMultiplier": number,
  "socialMediaBonus": number,
  "levels": [
    {
      "name": "string",
      "points": number,
      "benefits": "string"
    }
  ]
}
```

### Códigos de Erro

- 400 Bad Request: Dados inválidos
- 401 Unauthorized: Token inválido ou expirado
- 403 Forbidden: Sem permissão para a operação
- 404 Not Found: Recurso não encontrado
- 409 Conflict: Conflito (ex: CPF já cadastrado)
- 500 Internal Server Error: Erro interno do servidor
