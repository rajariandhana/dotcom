import ScrollSlideshow from "./ScrollSlideshow";

const data = [
	{
		"text":"This is me, today I went to Upper Mount Gravatt Westfield just like on our date",
		"image":"luv/1.jpg",
	},
	// {
	// 	"text":"This is me buying you a prize that I hope you will luv.",
	// 	"image":"luv/2.jpg",
	// },
	{
		"text":"In Uniqlo just like on our date!",
		"image":"luv/3.jpg",
	},
	{
		"text":"Ate SushiHub salmon that you disliked... just like on our date!",
		"image":"luv/4.jpg",
	},
	{
		"text":"This is me realizing there is an outdoor area on this Westfield.",
		"image":"luv/5.jpg",
	},
	{
		"text":"Me on M1!",
		"image":"luv/6.jpg",
	},
	{
		"text":"Getting you a box.",
		"image":"luv/7.jpg",
	},
	{
		"text":"Looking at the Brisbane countdown.",
		"image":"luv/8.jpg",
	},
	{
		"text":"Me realizing I don't have bread flour and had to go get some.",
		"image":"luv/9.jpg",
	},
	{
		"text":"Bread flour secured!",
		"image":"luv/10.jpg",
	},
	{
		"text":"Yeah I sent u this message earlier.",
		"image":"luv/11.JPG",
	},
	{
		"text":"BUTTER!",
		"image":"luv/12.jpg",
	},
	// {
	// 	"text":"lorem",
	// 	"image":"luv/13.jpg",
	// },
	{
		"text":"Me intrusively creating this website.",
		"image":"luv/15.jpg",
	},
	{
		"text": "Go ahead and open the box!",
	}
]

export default function Luv() {
	return <ScrollSlideshow slides={data} />
}