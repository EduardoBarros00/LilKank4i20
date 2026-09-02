export type Product = {
  id: number
  name: string
  category: string
  collection: string
  price: number
  oldPrice?: number
  badge?: 'Novo' | 'Destaque' | 'Promoção'
  image: string
  images: string[]
  sizes: string[]
  colors: string[]
  description: string
  details: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Camiseta Essencial',
    category: 'Camisetas',
    collection: 'Essenciais',
    price: 89.9,
    badge: 'Novo',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583743814966-8936f37f9989?auto=format&fit=crop&w=1200&q=85',
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Preto', 'Branco', 'Areia'],
    description: 'Modelagem versátil e visual limpo para o dia a dia.',
    details: 'Peça demonstrativa da vitrine. Informações reais de tecido, composição e cuidados serão cadastradas pelo proprietário.',
  },
  {
    id: 2,
    name: 'Camisa Linho',
    category: 'Camisas',
    collection: 'Leve',
    price: 159.9,
    badge: 'Destaque',
    image: 'https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=1200&q=85',
    ],
    sizes: ['P', 'M', 'G'],
    colors: ['Natural', 'Azul'],
    description: 'Visual leve, elegante e fácil de combinar.',
    details: 'Produto de demonstração para validar o layout da página de detalhes.',
  },
  {
    id: 3,
    name: 'Calça Alfaiataria',
    category: 'Calças',
    collection: 'Urbana',
    price: 189.9,
    oldPrice: 219.9,
    badge: 'Promoção',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1200&q=85',
    ],
    sizes: ['38', '40', '42', '44'],
    colors: ['Preto', 'Cinza'],
    description: 'Caimento moderno com proposta urbana.',
    details: 'As medidas reais poderão ser exibidas em uma tabela de tamanhos administrável futuramente.',
  },
  {
    id: 4,
    name: 'Jaqueta Urban',
    category: 'Jaquetas',
    collection: 'Urbana',
    price: 279.9,
    badge: 'Novo',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85',
    ],
    sizes: ['M', 'G', 'GG'],
    colors: ['Preto'],
    description: 'Peça marcante para composições contemporâneas.',
    details: 'Produto fictício usado apenas para demonstrar a estrutura do catálogo.',
  },
  {
    id: 5,
    name: 'Moletom Premium',
    category: 'Moletons',
    collection: 'Conforto',
    price: 199.9,
    badge: 'Destaque',
    image: 'https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=1200&q=85',
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Off-white', 'Cinza', 'Preto'],
    description: 'Conforto com acabamento minimalista.',
    details: 'A descrição detalhada será totalmente editável no futuro painel proprietário.',
  },
  {
    id: 6,
    name: 'Conjunto Minimal',
    category: 'Conjuntos',
    collection: 'Essenciais',
    price: 249.9,
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=85',
    ],
    sizes: ['P', 'M', 'G'],
    colors: ['Areia', 'Preto'],
    description: 'Combinação pronta com visual limpo e contemporâneo.',
    details: 'Exemplo de produto para uma coleção cadastrável e removível pelo proprietário.',
  },
]
