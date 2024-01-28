export enum CONNECTION_TYPE {
  SINGLE_PHASE = 'monofasico',
  TWO_PHASE = 'bifasico',
  THREE_PHASE = 'trifasico'
}

export enum CUSTOMER_CLASS {
  COMMERCIAL = 'comercial',
  RESIDENTIAL = 'residencial',
  INDUSTRIAL = 'industrial',
  PUBLIC_POWER = 'poderPublico',
  RURAL = 'rural'
}

export enum TARIFF_MODALITY {
  CONVENTIONAL = 'convencional',
  WHITE = 'branca',
  BLUE = 'azul',
  GREEN = 'verde'
}

export enum REASONS_FOR_INELIGIBILITY {
  CUSTOMER_CLASS_NOT_ACCEPTED = 'Classe de consumo não aceita',
  TARIFF_MODALITY_NOT_ACCEPTED = 'Modalidade tarifária não aceita',
  CONNECTION_TYPE_INSUFFICIENT_CONSUMPTION = 'Consumo médio insuficiente para o tipo de conexão'
}
