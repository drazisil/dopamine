import config from 'config'
import {
    createPool,
  } from 'slonik';
  
  const pool = await createPool(config.get("database.connection_url"));