import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { Plus, Trash2, Upload, Edit, X, Save, Filter } from "lucide-react";

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});

// Lista fixa de categorias do catálogo
const CATEGORIES = [
  "CAPACETES",
  "PROTEÇÃO AUDITIVA",
  "LUVAS DE PROTEÇÃO",
  "CALÇADOS DE SEGURANÇA",
  "PROTEÇÃO RESPIRATÓRIA",
  "PROTEÇÃO VISUAL",
  "FERRAMENTAS",
  "ÓLEO E GRAXAS",
  "PROTEÇÃO CONTRA QUEDAS",
  "VESTUÁRIO"
];

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

// Componente para Gerenciar Produtos
function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("ALL");

  // Estados do formulário de criação
  const [name, setName] = useState('');
  const [caNumber, setCaNumber] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [productImageUrl, setProductImageUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);

  // Estado para edição
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  const loadProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Upload da imagem
  const uploadImage = async (fileToUpload: File) => {
    const fileExt = fileToUpload.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `product-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, fileToUpload);

    if (uploadError) {
      throw new Error("Erro ao enviar imagem: " + uploadError.message);
    }

    const { data: publicUrlData } = supabase.storage
      .from('products')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = productImageUrl;

      if (file) {
        finalImageUrl = await uploadImage(file);
      }

      const { error } = await supabase.from('products').insert([
        {
          name,
          ca_number: caNumber,
          category,
          price: parseFloat(price) || 0,
          description,
          image_url: finalImageUrl || null,
          is_active: true
        }
      ]);

      if (error) throw error;

      alert('Produto cadastrado com sucesso!');
      setName('');
      setCaNumber('');
      setCategory(CATEGORIES[0]);
      setPrice('');
      setDescription('');
      setProductImageUrl('');
      setFile(null);
      loadProducts();
    } catch (err: any) {
      alert(err.message || 'Erro ao cadastrar produto.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string, imageUrl: string | null) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    await supabase.from('products').delete().eq('id', id);

    if (imageUrl && imageUrl.includes("products/product-images/")) {
      const path = imageUrl.split("product-images/")[1];
      if (path) {
        await supabase.storage.from("products").remove([`product-images/${path}`]);
      }
    }

    loadProducts();
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setLoading(true);

    try {
      let finalImageUrl = editingProduct.image_url;

      if (editingProduct.newFile) {
        finalImageUrl = await uploadImage(editingProduct.newFile);
      }

      const { error } = await supabase
        .from('products')
        .update({
          name: editingProduct.name,
          ca_number: editingProduct.ca_number,
          category: editingProduct.category,
          price: parseFloat(editingProduct.price) || 0,
          description: editingProduct.description,
          image_url: finalImageUrl
        })
        .eq('id', editingProduct.id);

      if (error) throw error;

      alert('Produto atualizado com sucesso!');
      setEditingProduct(null);
      loadProducts();
    } catch (err: any) {
      alert(err.message || 'Erro ao atualizar produto.');
    } finally {
      setLoading(false);
    }
  };

  // Categorias a serem exibidas com base no filtro
  const categoriesToDisplay = selectedCategoryFilter === "ALL" 
    ? CATEGORIES 
    : CATEGORIES.filter(cat => cat === selectedCategoryFilter);

  return (
    <div className="space-y-8">
      {/* Formulário de Cadastro */}
      <form onSubmit={handleCreateProduct} className="space-y-4 rounded-lg bg-slate-800 p-5 border border-slate-700">
        <h3 className="text-lg font-bold text-slate-200">Cadastrar Novo Produto</h3>
        
        <div>
          <label className="block text-sm mb-1 font-medium text-slate-300">Nome do Produto *</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full p-2 rounded bg-slate-900 border border-slate-700 text-white" 
            required 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1 text-slate-300">Número do CA</label>
            <input 
              type="text" 
              value={caNumber} 
              onChange={(e) => setCaNumber(e.target.value)} 
              className="w-full p-2 rounded bg-slate-900 border border-slate-700 text-white" 
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-300">Categoria *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 rounded bg-slate-900 border border-slate-700 text-white"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-300">Preço (R$)</label>
            <input 
              type="number" 
              step="0.01" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              className="w-full p-2 rounded bg-slate-900 border border-slate-700 text-white" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1 text-slate-300">Descrição do Produto</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detalhes técnicos, especificações, etc..."
            className="w-full p-2 rounded bg-slate-900 border border-slate-700 text-white"
          />
        </div>

        {/* Upload / URL da Imagem */}
        <div className="space-y-3 pt-2">
          <div>
            <label className="block text-sm mb-1 font-medium text-slate-300">Upload da Imagem do Produto</label>
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
            <label className="block text-sm mb-1 text-slate-300">URL da Imagem</label>
            <input 
              type="text" 
              value={productImageUrl} 
              disabled={!!file}
              onChange={(e) => setProductImageUrl(e.target.value)} 
              className="w-full p-2 rounded bg-slate-900 border border-slate-700 text-white disabled:opacity-50" 
              placeholder="https://..." 
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-emerald-500 hover:bg-emerald-600 font-bold py-2 rounded text-black transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" /> {loading ? 'Salvando...' : 'Salvar Produto'}
        </button>
      </form>

      {/* Exibição dos Produtos Agrupados por Categoria */}
      <div className="space-y-6 pt-4 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-xl font-bold text-emerald-400">Produtos Cadastrados</h3>
          
          {/* Filtro por Categoria */}
          <div className="flex items-center gap-2 bg-slate-800 p-2 rounded border border-slate-700 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-emerald-400 flex-shrink-0" />
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="bg-transparent text-sm text-slate-200 outline-none w-full cursor-pointer font-medium"
            >
              <option value="ALL" className="bg-slate-900 text-white">Todas as Categorias</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900 text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {categoriesToDisplay.map((cat) => {
          const categoryProducts = products.filter((p) => p.category === cat);
          if (categoryProducts.length === 0) return null;

          return (
            <div key={cat} className="space-y-3 bg-slate-800/50 p-4 rounded-lg border border-slate-800">
              <h4 className="text-sm font-bold text-emerald-400 tracking-wider uppercase flex items-center justify-between">
                <span>{cat}</span>
                <span className="text-xs text-slate-400 font-normal">({categoryProducts.length} itens)</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categoryProducts.map((p) => (
                  <div key={p.id} className="flex gap-3 bg-slate-900 p-3 rounded border border-slate-700/80 justify-between items-start">
                    <div className="flex gap-3 overflow-hidden">
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.name} className="h-16 w-16 object-cover rounded bg-slate-800 flex-shrink-0" />
                      ) : (
                        <div className="h-16 w-16 bg-slate-800 rounded flex items-center justify-center text-xs text-slate-500 flex-shrink-0">Sem Foto</div>
                      )}
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-slate-100 truncate">{p.name}</p>
                        {p.ca_number && <p className="text-xs text-slate-400">CA: {p.ca_number}</p>}
                        
                        {/* Exibe o preço apenas se ele for maior que zero */}
                        {p.price && Number(p.price) > 0 ? (
                          <p className="text-xs text-emerald-400 font-bold mt-1">
                            R$ {Number(p.price).toFixed(2)}
                          </p>
                        ) : null}

                        {p.description && <p className="text-xs text-slate-400 truncate mt-1">{p.description}</p>}
                      </div>
                    </div>

                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => setEditingProduct(p)}
                        className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id, p.image_url)}
                        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded"
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de Edição */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 w-full max-w-lg space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-bold text-lg text-emerald-400">Editar Produto</h3>
              <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProduct} className="space-y-4">
              <div>
                <label className="block text-sm mb-1 text-slate-300">Nome</label>
                <input
                  type="text"
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1 text-slate-300">CA</label>
                  <input
                    type="text"
                    value={editingProduct.ca_number || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, ca_number: e.target.value })}
                    className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-slate-300">Categoria</label>
                  <select
                    value={editingProduct.category || CATEGORIES[0]}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1 text-slate-300">Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct.price || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-slate-300">Descrição</label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-slate-300">Trocar Imagem (Arquivo)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditingProduct({ ...editingProduct, newFile: e.target.files?.[0] || null })}
                  className="w-full text-xs text-slate-300 bg-slate-800 p-2 rounded border border-slate-700"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-slate-300">Ou URL da Imagem</label>
                <input
                  type="text"
                  value={editingProduct.image_url || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                  className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 font-bold py-2 rounded text-black flex items-center justify-center gap-1"
                >
                  <Save className="h-4 w-4" /> Salvar Alterações
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded text-white"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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

  if (!session) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-slate-900 text-white rounded-lg shadow-md border border-slate-800">
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
    <div className="max-w-4xl mx-auto my-8 p-6 bg-slate-900 text-white rounded-lg shadow-xl border border-slate-800">
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-emerald-400">Painel Administrativo</h2>
        <button onClick={handleLogout} className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition-colors font-medium">
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
        <AdminProducts />
      ) : (
        <AdminBanners />
      )}
    </div>
  );
}