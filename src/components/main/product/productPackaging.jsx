function ProductPackaging({packaging}) {
    return (
        <div>
            {
                packaging
                    ?
                    Object.entries(packaging).map(entry => {
                        const [key, value] = entry
                        return <span key={key}>{value} {key}</span>
                    })
                    : ""
            }
        </div>
    );
}

export default ProductPackaging;