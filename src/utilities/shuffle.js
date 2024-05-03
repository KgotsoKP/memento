const shuffle = () => {
    const assets = [
        { image: 'assets/avocado.png' },
        { image: 'assets/green-apple.png' },
        { image: 'assets/red-apple.png' },
        { image: 'assets/peach.png' },
        { image: 'assets/pizza.png' },
        { image: 'assets/watermelon.png' },
        { image: 'assets/garlic.png' },
        { image: 'assets/broccoli.png' },
    ]

    return [...assets, ...assets]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }));
}

export default shuffle;