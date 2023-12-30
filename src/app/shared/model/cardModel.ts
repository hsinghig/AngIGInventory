export interface ICardModel {
    id: number;
    imageURL: string;
    imageAlt: string;
    displayTextTitle: string;
    displayText: string;
    linkText: string;
    linkURL: string;
}

export const HOME_PAGE_CARDS: ICardModel[]= [
{
    id: 1,
    imageURL: 'assets/img/products-1920x1280.jpg',
    imageAlt: 'Stronger',
    displayTextTitle: 'STRONGER',
    displayText: "Impact Guard's composite panels deliver a better strength-to-weight ratio than steel, aluminum, and plywood, but that's just one of the advantages.",
    linkText: 'Home',
    linkURL: '/home'
},
{
    id:3,
    imageURL: 'assets/img/slide3.jpg',
    imageAlt: 'Tougher',
    displayTextTitle: 'TOUGHER',
    displayText: "How tough are Impact Guard's composite panels compared to aluminum? This sledgehammer test may surprise you.",
    linkText: 'Home',
    linkURL: '/home'
},
{
    id:2,
    imageURL: 'assets/img/slide2.jpg',
    imageAlt: 'Versatile',
    displayTextTitle: 'VERSATILE',
    displayText: "Impact Guard's composite panels are ideal for truck or trailer lining applications but their versatility and design flexibility are an asset in many markets.",
    linkText: 'Home',
    linkURL: '/home'
},

{
    id:4,
    imageURL: 'assets/img/careers-banner-1920x936.jpg',
    imageAlt: 'Join US',
    displayTextTitle: 'JOIN US',
    displayText: "Join the Impact Guard team.",
    linkText: 'Home',
    linkURL: '/home'
}
]