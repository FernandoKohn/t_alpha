import styles from './Dashboard.module.css'
import { useOutletContext } from 'react-router-dom'
import { Navbar } from "./Navbar"
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Dashboard = () => {

  const [newProduct, setNewProduct] = useState()
  const [editedProduct, setEditedProduct] = useState()
  const [productId, setProductId] = useState()
  const [products, setProducts] = useState([])
  const [refresh, setRefresh] = useState()
  const [showEdit, setShowEdit] = useState(false)
  const [querySearch, setQuerySearch] = useState('')
  const [search, setSearch] = useState([])

  const userContext = useOutletContext()

  useEffect(() => {
    getProducts()
  }, [refresh])

  const getProducts = async () => {
    let options = {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${userContext.token}` },
      url: 'https://interview.t-alpha.com.br/api/products/get-all-products'
    };

    try {
      let { data } = await axios.request(options);
      setProducts(data.data.products)
    } catch (error) {
      console.error(error);
    }
  }

  const toggleEdit = e => {
    setShowEdit(true)
    setProductId(e.target.id)
  }

  const handleEdit = async e => {
    e.preventDefault()
    const options = {
      method: 'PATCH',
      url: `https://interview.t-alpha.com.br/api/products/update-product/${productId}`,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userContext.token}` },
      data: {
        name: `${editedProduct.name}`,
        description: `${editedProduct.description}`,
        price: parseFloat(editedProduct.price),
        stock: parseFloat(editedProduct.stock)
      }
    };

    try {
      const { data } = await axios.request(options);
      console.log(data);
      setRefresh(!refresh)
      setShowEdit(false)
      setProductId()
    } catch (error) {
      console.error(error);
    }

  }

  const handleFormEdit = e => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value })
  }

  const handleDelete = async e => {
    e.preventDefault()
    const options = {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${userContext.token}` },
      url: `https://interview.t-alpha.com.br/api/products/delete-product/${e.target.id}`
    };

    try {
      const { data } = await axios.request(options);
      console.log(data);
      setRefresh(!refresh)
    } catch (error) {
      console.error(error);
    }
  }

  const handleQuery = e => {
    const query = e.target.value
    setQuerySearch(query)
    const resultado = products.filter((res) => {
      res.name.includes(query)
    })
    setSearch(resultado)
  }

  const handleFormChange = e => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const options = {
      method: 'POST',
      url: 'https://interview.t-alpha.com.br/api/products/create-product',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userContext.token}` },
      data: {
        name: `${newProduct.name}`,
        description: `${newProduct.description}`,
        price: parseFloat(newProduct.price),
        stock: parseFloat(newProduct.stock)
      }
    };

    try {
      const { data } = await axios.request(options);
      console.log(data);
      setRefresh(!refresh)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.main}>
      <Navbar />
      <section className={styles.content}>
        <div className={styles.leftDiv}>
          <TextField onChange={handleQuery} value={querySearch} id="outlined-basic" label=" 🔍Pesquisar produtos" variant="outlined" />
          {showEdit === true ? (
            <>
              <form onSubmit={handleEdit}>
                <h1>Editar produto</h1>
                <TextField onChange={handleFormEdit} type="text" inputProps={{ maxLength: 20 }} required id="name" name="name" label="Nome do produto" variant="outlined" />
                <TextField onChange={handleFormEdit} type="text" inputProps={{ maxLength: 40 }} required id="description" name="description" label="Descrição" variant="outlined" />
                <TextField onChange={handleFormEdit} required type="number" inputProps={{ maxLength: 12 }} id="price" name="price" label="Preço" variant="outlined" />
                <TextField onChange={handleFormEdit} type="number" inputProps={{ maxLength: 12 }} required id="stock" name="stock" label="Quantidade em stock" variant="outlined" />
                <button type='submit'>Editar</button>
              </form>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <h1>Cadastrar produto</h1>
                <TextField onChange={handleFormChange} type="text" inputProps={{ maxLength: 20 }} required id="name" name="name" label="Nome do produto" variant="outlined" />
                <TextField onChange={handleFormChange} type="text" inputProps={{ maxLength: 25 }} required id="description" name="description" label="Descrição" variant="outlined" />
                <TextField onChange={handleFormChange} required type="number" inputProps={{ maxLength: 12 }} id="price" name="price" label="Preço" variant="outlined" />
                <TextField onChange={handleFormChange} type="number" inputProps={{ maxLength: 12 }} required id="stock" name="stock" label="Quantidade em stock" variant="outlined" />
                <button type='submit'>Cadastrar</button>
              </form>
            </>
          )}
        </div>
        <div className={styles.rightDiv}>
          <h1>PRODUTOS</h1>
          <div className={styles.line}></div>
          <div className={styles.produtoSection}>
            {search.length > 0 ? (
              <h1>a</h1>
              // search.toReversed().map((product, index) => (
              //   <div key={index} className={styles.productCard}>
              //     <div className={styles.icons}>
              //       <i className={styles.edit} id={product.id} onClick={toggleEdit} class='bx bxs-edit'></i>
              //       <i className={styles.delete} id={product.id} onClick={handleDelete} class='bx bx-trash-alt' ></i>
              //     </div>
              //     <h1>{product.name}</h1>
              //     <p>{product.description}</p>
              //     <p>R$ {product.price}</p>
              //     <p>Em estoque: {product.stock}</p>
              //   </div>
              // ))
            ) : (
              <h1>b</h1>
              // products.toReversed().map((product, index) => (
              //   <div key={index} className={styles.productCard}>
              //     <div className={styles.icons}>
              //       <i className={styles.edit} id={product.id} onClick={toggleEdit} class='bx bxs-edit'></i>
              //       <i className={styles.delete} id={product.id} onClick={handleDelete} class='bx bx-trash-alt' ></i>
              //     </div>
              //     <h1>{product.name}</h1>
              //     <p>{product.description}</p>
              //     <p>R$ {product.price}</p>
              //     <p>Em estoque: {product.stock}</p>
              //   </div>
              // ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
