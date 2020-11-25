function summon(servant) {
    //ToDo patch to summon
    let url = `http://localhost:3000/servants/${servant.id}`;
    servant.summoned = 1;
    servant.date = new Date().toLocaleDateString('ru-RU');
    fetch(url, {
        method :'PUT',
        body: JSON.stringify(servant),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            credentials: 'same-origin'
        }
    })
        .then(res => console.log(res.status));
}
export default summon
