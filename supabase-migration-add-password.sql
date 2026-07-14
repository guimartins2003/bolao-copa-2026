-- Execute este SQL no Supabase SQL Editor para adicionar a coluna password_hash
-- Esta migration é segura e pode ser executada mesmo com dados existentes

ALTER TABLE players ADD COLUMN password_hash TEXT;

-- Se houver usuários existentes, você pode definir uma senha padrão
-- Descomente a linha abaixo se necessário (substitua com um hash real se necessário)
-- UPDATE players SET password_hash = 'default_hash' WHERE password_hash IS NULL;

-- Após popular os dados, torne a coluna NOT NULL
-- ALTER TABLE players ALTER COLUMN password_hash SET NOT NULL;
