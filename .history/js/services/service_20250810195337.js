const sendForm = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data,
    })
    return await res.json(); // дождаться готового промиса потом вернуть
}

export {sendForm};

const getResourse = async (url) => {
        const res = await fetch(url); // GET
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return res.json();
    }