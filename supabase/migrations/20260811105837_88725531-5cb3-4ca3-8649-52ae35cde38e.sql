CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  ca_number TEXT,
  category TEXT,
  price NUMERIC(10,2),
  price_label TEXT,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active products" ON public.products FOR SELECT USING (is_active = true);

INSERT INTO public.products (name, ca_number, category, price, price_label, image_url) VALUES
('Capacete de Segurança Classe B', '31469', 'Capacetes', 24.90, NULL, NULL),
('Protetor Auricular Concha 21dB', '12345', 'Proteção Auditiva', 39.90, NULL, NULL),
('Luva Nitrílica Antiderrapante', '28901', 'Luvas de Proteção', 12.50, NULL, NULL),
('Botina de Segurança Bico de Aço', '42177', 'Calçados de Segurança', 129.90, NULL, NULL),
('Respirador PFF2 com Válvula', '38055', 'Proteção Respiratória', 8.90, NULL, NULL),
('Óculos de Proteção Incolor AE', '19632', 'Proteção Visual', 14.90, NULL, NULL),
('Kit Ferramentas Industrial 6 pçs', NULL, 'Ferramentas', 189.00, NULL, NULL),
('Kit Emergência com Extintor', NULL, 'Kits de Emergência', NULL, 'Sob consulta', NULL),
('Cinto de Segurança Paraquedista', '35102', 'Proteção Contra Quedas', 249.90, NULL, NULL),
('Máscara de Solda Automática', '27650', 'Proteção Visual', 179.90, NULL, NULL),
('Colete Refletivo Laranja', '—', 'Vestuário', 19.90, NULL, NULL),
('Luva de Vaqueta Reforçada', '41288', 'Luvas de Proteção', 27.50, NULL, NULL);