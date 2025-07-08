export const MenuListArray2 = [
    {
        title: 'Página Inicial',	
        to: '/',
    },
    {   
        title: 'Livros', 
        classsChange: 'sub-menu-down',
        content: [
            {
                title: 'Livros em Destaque',
                to: '/books-list-view-sidebar',
            },
            {
                title: 'Livros Mais Vendidos',
                to: '/books-grid-view-sidebar?category=mostSold',
            },
            {
                title: 'Livros Populares',
                to: '/books-grid-view-sidebar?category=mostLiked',
            },
        ],	
        to: '/books-list-view-sidebar',
    },
    {
        title: 'Oportunidades',	
        to: '/books-list-view-sidebar?category=opportunities',
    },
   
    {   
        title: 'Sobre Nós', 	
        to: '/about-us',
    },
    
    {
        title: 'Contactos',	
        to: '/contact-us',
    },
   
   
   
]