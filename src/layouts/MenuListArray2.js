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
                to: '/books-grid-view-sidebar',
            },
            {
                title: 'Livros Mais Vendidos',
                to: '/books-grid-view-sidebar',
            },
            {
                title: 'Novidades',
                to: '/books-grid-view-sidebar',
            },
            {
                title: 'Livros Populares',
                to: '/books-grid-view-sidebar',
            },
        ],	
        to: '/books-grid-view-sidebar',
    },
    {
        title: 'Oportunidades',	
        to: '/',
    },
    {
        title: 'Blog',
        classsChange: 'sub-menu-down',
        content:[
            {
                title:'Blog Grid',
                to:'/blog-grid',
            },
            {
                title:'Blog Large Sidebar',
                to:'/blog-large-sidebar',
            },
            {
                title:'Blog List Sidebar',
                to:'/blog-list-sidebar',
            },
            {
                title:'Blog Details',
                to:'/blog-detail',
            },
            
        ],
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