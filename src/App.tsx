import { useMemo, useState } from 'react'
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { products, type Product } from './data/products'

const money = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export default function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todos')
  const [sort, setSort] = useState('recentes')
  const [selected, setSelected] = useState<Product | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [favoriteIds, setFavoriteIds] = useState<number[]>([])

  const categories = useMemo(
    () => ['Todos', ...Array.from(new Set(products.map((product) => product.category)))],
    [],
  )

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const list = products.filter((product) => {
      const matchesCategory = category === 'Todos' || product.category === category
      const matchesQuery =
        !normalizedQuery ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery) ||
        product.collection.toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })

    return [...list].sort((a, b) => {
      if (sort === 'preco-menor') return a.price - b.price
      if (sort === 'preco-maior') return b.price - a.price
      if (sort === 'nome') return a.name.localeCompare(b.name)
      return b.id - a.id
    })
  }, [category, query, sort])

  function toggleFavorite(id: number) {
    setFavoriteIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  return (
    <div className="app-shell">
      <div className="announcement">Nova vitrine Estilo do Ben • acompanhe as novidades</div>

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Estilo do Ben - início">
          <span className="brand-kicker">ESTILO DO</span>
          <strong>BEN</strong>
        </a>

        <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Navegação principal">
          <a href="#inicio" onClick={() => setMenuOpen(false)}>Início</a>
          <a href="#novidades" onClick={() => setMenuOpen(false)}>Novidades</a>
          <a href="#catalogo" onClick={() => setMenuOpen(false)}>Catálogo</a>
          <a href="#colecoes" onClick={() => setMenuOpen(false)}>Coleções</a>
          <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
        </nav>

        <div className="header-actions">
          <button className="icon-button" aria-label="Buscar" onClick={() => document.querySelector<HTMLInputElement>('#catalog-search')?.focus()}>
            <Search size={20} />
          </button>
          <button className="icon-button" aria-label="Favoritos">
            <Heart size={20} />
            {favoriteIds.length > 0 && <span className="action-badge">{favoriteIds.length}</span>}
          </button>
          <button className="icon-button desktop-only" aria-label="Minha conta">
            <User size={20} />
          </button>
          <button className="icon-button mobile-menu" aria-label="Abrir menu" onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-content">
            <span className="eyebrow">ESTILO PARA O DIA A DIA</span>
            <h1>Vista o que combina com você.</h1>
            <p>
              Uma vitrine feita para descobrir peças, coleções e novidades da Estilo do Ben com rapidez e personalidade.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#catalogo">Ver catálogo</a>
              <a className="button button-light" href="#novidades">Novidades</a>
            </div>
          </div>
          <div className="hero-image" aria-label="Imagem de moda da coleção em destaque">
            <span className="hero-label">Coleção em destaque</span>
          </div>
        </section>

        <section className="quick-categories" aria-label="Categorias principais">
          {categories.slice(1, 6).map((item) => (
            <button key={item} onClick={() => { setCategory(item); document.querySelector('#catalogo')?.scrollIntoView({ behavior: 'smooth' }) }}>
              {item}
            </button>
          ))}
        </section>

        <section className="section" id="novidades">
          <div className="section-heading">
            <div>
              <span className="eyebrow">CHEGARAM AGORA</span>
              <h2>Novidades</h2>
            </div>
            <a href="#catalogo">Ver todos</a>
          </div>
          <div className="product-grid compact-grid">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                favorite={favoriteIds.includes(product.id)}
                onFavorite={toggleFavorite}
                onOpen={setSelected}
              />
            ))}
          </div>
        </section>

        <section className="collection-banner" id="colecoes">
          <div>
            <span className="eyebrow light">COLEÇÕES</span>
            <h2>Uma vitrine que muda com a sua loja.</h2>
            <p>As coleções, banners e destaques serão administráveis pelo painel do proprietário.</p>
            <a className="button button-light" href="#catalogo">Explorar peças</a>
          </div>
        </section>

        <section className="section catalog-section" id="catalogo">
          <div className="section-heading catalog-title">
            <div>
              <span className="eyebrow">ENCONTRE SEU ESTILO</span>
              <h2>Catálogo</h2>
            </div>
            <p>{filtered.length} {filtered.length === 1 ? 'produto' : 'produtos'}</p>
          </div>

          <div className="catalog-toolbar">
            <label className="search-field">
              <Search size={18} />
              <input
                id="catalog-search"
                type="search"
                placeholder="Buscar produto, categoria ou coleção..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Ordenar produtos">
              <option value="recentes">Mais recentes</option>
              <option value="nome">Nome</option>
              <option value="preco-menor">Menor preço</option>
              <option value="preco-maior">Maior preço</option>
            </select>
          </div>

          <div className="category-pills" aria-label="Filtrar por categoria">
            {categories.map((item) => (
              <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="product-grid">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  favorite={favoriteIds.includes(product.id)}
                  onFavorite={toggleFavorite}
                  onOpen={setSelected}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <ShoppingBag size={34} />
              <h3>Nenhum produto encontrado</h3>
              <p>Tente outra busca ou selecione uma categoria diferente.</p>
              <button className="button button-dark" onClick={() => { setQuery(''); setCategory('Todos') }}>Limpar filtros</button>
            </div>
          )}
        </section>

        <section className="contact-section" id="contato">
          <div>
            <span className="eyebrow">FALE COM A LOJA</span>
            <h2>Gostou de uma peça?</h2>
            <p>Os canais oficiais de atendimento serão configurados pelo proprietário. Nenhum número ou perfil fictício foi adicionado.</p>
          </div>
          <div className="contact-card">
            <strong>Atendimento Estilo do Ben</strong>
            <span>WhatsApp • Instagram • outros canais</span>
            <small>Configuração disponível na próxima fase administrativa.</small>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <span className="brand-kicker">ESTILO DO</span>
          <strong>BEN</strong>
          <p>Moda, identidade e uma vitrine feita para crescer.</p>
        </div>
        <div>
          <strong>Navegação</strong>
          <a href="#inicio">Início</a>
          <a href="#catalogo">Catálogo</a>
          <a href="#colecoes">Coleções</a>
        </div>
        <div>
          <strong>Loja</strong>
          <a href="#novidades">Novidades</a>
          <a href="#contato">Contato</a>
        </div>
        <div className="footer-bottom">© {new Date().getFullYear()} Estilo do Ben. Base demonstrativa.</div>
      </footer>

      {selected && (
        <ProductModal
          product={selected}
          favorite={favoriteIds.includes(selected.id)}
          onFavorite={toggleFavorite}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}

type ProductCardProps = {
  product: Product
  favorite: boolean
  onFavorite: (id: number) => void
  onOpen: (product: Product) => void
}

function ProductCard({ product, favorite, onFavorite, onOpen }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <button className="product-image-button" onClick={() => onOpen(product)} aria-label={`Abrir ${product.name}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </button>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className={favorite ? 'favorite-button active' : 'favorite-button'} onClick={() => onFavorite(product.id)} aria-label="Favoritar produto">
          <Heart size={18} fill={favorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <button className="product-info" onClick={() => onOpen(product)}>
        <span>{product.category} • {product.collection}</span>
        <h3>{product.name}</h3>
        <div className="price-row">
          <strong>{money.format(product.price)}</strong>
          {product.oldPrice && <del>{money.format(product.oldPrice)}</del>}
        </div>
      </button>
    </article>
  )
}

function ProductModal({ product, favorite, onFavorite, onClose }: { product: Product; favorite: boolean; onFavorite: (id: number) => void; onClose: () => void }) {
  const [image, setImage] = useState(product.images[0] ?? product.image)
  const [size, setSize] = useState<string | null>(null)

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-title">
        <button className="modal-close" aria-label="Fechar" onClick={onClose}><X size={22} /></button>
        <div className="modal-gallery">
          <img className="modal-main-image" src={image} alt={product.name} />
          {product.images.length > 1 && (
            <div className="thumbnail-row">
              {product.images.map((item) => (
                <button key={item} onClick={() => setImage(item)} className={image === item ? 'active' : ''}>
                  <img src={item} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="modal-content">
          <span className="eyebrow">{product.category} • {product.collection}</span>
          <h2 id="product-title">{product.name}</h2>
          <div className="modal-price">
            <strong>{money.format(product.price)}</strong>
            {product.oldPrice && <del>{money.format(product.oldPrice)}</del>}
          </div>
          <p className="lead">{product.description}</p>

          <div className="option-group">
            <div className="option-title"><strong>Tamanho</strong><span>{size ? `Selecionado: ${size}` : 'Selecione'}</span></div>
            <div className="size-buttons">
              {product.sizes.map((item) => (
                <button key={item} className={size === item ? 'active' : ''} onClick={() => setSize(item)}>{item}</button>
              ))}
            </div>
          </div>

          <div className="option-group">
            <strong>Cores disponíveis</strong>
            <p>{product.colors.join(' • ')}</p>
          </div>

          <div className="product-details">
            <strong>Detalhes</strong>
            <p>{product.details}</p>
          </div>

          <div className="modal-actions">
            <a className="button button-dark" href="#contato" onClick={onClose}>Tenho interesse</a>
            <button className="button button-outline" onClick={() => onFavorite(product.id)}>
              <Heart size={18} fill={favorite ? 'currentColor' : 'none'} /> {favorite ? 'Favoritado' : 'Favoritar'}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
