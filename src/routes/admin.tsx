import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { Plus, Trash2, Upload } from "lucide-react";

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});

// Componente para Gerenciar Banners (Upload de Arquivo / URL)
function AdminBanners() {
  const [banners, setBanners] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [orderIndex, setOrderIndex] = useState("0");
  const [loading, setLoading] = useState(false);

  const loadBanners = async () => {
    const { data } = await supabase.from("banners").select("*").order("order_index", { ascending: true });
    if (data) setBanners(data);
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let finalImageUrl = imageUrl;

    // Se o usuário selecionou um arquivo local, faz o upload para o Supabase Storage
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `hero-banners/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('banners')
        .upload(filePath, file);

      if (uploadError) {
        alert("Erro ao enviar imagem: " + uploadError.message);
        setLoading(false);
        return;
      }

      // Obtém a URL pública do arquivo enviado
      const { data: publicUrlData } = supabase.storage
        .from('banners')
        .getPublicUrl(filePath);

      finalImageUrl = publicUrlData.publicUrl;
    }

    if (!finalImageUrl.trim()) {
      alert("Por favor, selecione uma imagem ou informe uma URL.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("banners").insert([
      {
        image_url: finalImageUrl,
        order_index: parseInt(orderIndex) || 0,
      },
    ]);

    if (error) {
      alert("Erro ao cadastrar banner: " + error.message);
    } else {
      setImageUrl("");
      setFile(null);
      setOrderIndex("0");
      loadBanners();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string, currentImageUrl: string) => {
    if (!confirm("Tem certeza que deseja excluir este banner?")) return;

    await supabase.from("banners").delete().eq("id", id);

    // Opcional: Se for imagem do storage, remove do bucket
    if (currentImageUrl.includes("banners/hero-banners/")) {
      const path = currentImageUrl.split("hero-banners/")[1];
      if (path) {
        await supabase.storage.from("banners").remove([`hero-banners/${path}`]);
      }
    }

    loadBanners();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-slate-200">Gerenciar Banners (Carrossel)</h3>

      <form onSubmit={handleAdd} className="grid gap-4 rounded-lg bg-slate-800 p-4 text-white border border-slate-700">
        <div>
          <label className="block text-sm mb-1 font-medium">Upload da Imagem do Computador *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full rounded bg-slate-900 border border-slate-700 p-2 text-sm text-slate-300 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-emerald-500 file:text-black hover:file:bg-emerald-600"
          />
        </div>

        <div className="relative flex items-center justify-center my-1">
          <div className="border-t border-slate-700 w-full"></div>
          <span className="bg-slate-800 px-2 text-xs text-slate-400 absolute">ou informe a URL</span>
        </div>

        <div>
          <label className="block text-sm mb-1">URL da Imagem</label>
          <input
            type="text"
            placeholder="https://exemplo.com/imagem.jpg"
            value={imageUrl}
            disabled={!!file}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full rounded bg-slate-900 border border-slate-700 p-2 text-sm text-white disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Ordem de Exibição</label>
          <input
            type="number"
            placeholder="0"
            value={orderIndex}
            onChange={(e) => setOrderIndex(e.target.value)}
            className="w-full rounded bg-slate-900 border border-slate-700 p-2 text-sm text-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded bg-emerald-500 p-2 font-bold text-black hover:bg-emerald-600 transition-colors disabled:opacity-50"
        >
          <Upload className="h-4 w-4" /> {loading ? "Enviando..." : "Adicionar Banner"}
        </button>
      </form>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-slate-400">Banners Ativos ({banners.length})</h4>
        {banners.map((b) => (
          <div key={b.id} className="flex items-center justify-between rounded border border-slate-700 bg-slate-800 p-3 gap-4">
            <div className="flex items-center gap-4">
              <img
                src={b.image_url}
                alt="Banner"
                className="h-16 w-32 object-cover rounded border border-slate-700 bg-slate-900"
              />
              <div>
                <span className="text-xs bg-slate-700 text-emerald-400 px-2 py-0.5 rounded font-mono">
                  Ordem: {b.order_index ?? 0}
                </span>
                <p className="text-xs text-slate-400 truncate max-w-xs mt-1">{b.image_url}</p>
              </div>
            </div>

            <button
              onClick={() => handleDelete(b.id, b.image_url)}
              className="text-red-400 hover:text-red-300 p-2 rounded hover:bg-red-950/30 transition-colors"
              title="Excluir Banner"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Página Principal do Admin
function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'banners'>('products');

  // Formulário do Produto
  const [name, setName] = useState('');
  const [caNumber, setCaNumber] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [productImageUrl, setProductImageUrl] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert('Erro ao entrar: ' + error.message);
    setLoading(false);
  };

  const handleLogout = () => supabase.auth.signOut();

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('products').insert([
      {
        name,
        ca_number: caNumber,
        category,
        price: parseFloat(price) || 0,
        image_url: productImageUrl || null,
        is_active: true
      }
    ]);

    if (error) {
      alert('Erro ao cadastrar produto: ' + error.message);
    } else {
      alert('Produto cadastrado com sucesso!');
      setName(''); setCaNumber(''); setCategory(''); setPrice(''); setProductImageUrl('');
    }
    setLoading(false);
  };

  if (!session) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-slate-900 text-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-emerald-400">Acesso Restrito - Admin</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">E-mail</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Senha</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white" 
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-emerald-500 hover:bg-emerald-600 font-bold py-2 rounded text-black transition-colors"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-slate-900 text-white rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-emerald-400">Painel Administrativo</h2>
        <button onClick={handleLogout} className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition-colors">
          Sair
        </button>
      </div>

      <div className="flex gap-4 mb-6 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 font-semibold text-sm rounded-t-md transition-colors ${
            activeTab === 'products'
              ? 'bg-emerald-500 text-black'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Produtos
        </button>
        <button
          onClick={() => setActiveTab('banners')}
          className={`px-4 py-2 font-semibold text-sm rounded-t-md transition-colors ${
            activeTab === 'banners'
              ? 'bg-emerald-500 text-black'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Banners do Carrossel
        </button>
      </div>

      {activeTab === 'products' ? (
        <form onSubmit={handleCreateProduct} className="space-y-4">
          <h3 className="text-lg font-bold text-slate-200">Cadastrar Novo Produto</h3>
          <div>
            <label className="block text-sm mb-1 font-medium">Nome do Produto *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Número do CA</label>
              <input type="text" value={caNumber} onChange={(e) => setCaNumber(e.target.value)} className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white" />
            </div>
            <div>
              <label className="block text-sm mb-1">Categoria</label>
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Preço (R$)</label>
              <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white" />
            </div>
            <div>
              <label className="block text-sm mb-1">URL da Imagem</label>
              <input type="text" value={productImageUrl} onChange={(e) => setProductImageUrl(e.target.value)} className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white" placeholder="https://..." />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-600 font-bold py-2 rounded text-black transition-colors">
            {loading ? 'Cadastrando...' : 'Salvar Produto'}
          </button>
        </form>
      ) : (
        <AdminBanners />
      )}
    </div>
  );
}