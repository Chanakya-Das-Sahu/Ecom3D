import Reac from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { context } from './App.jsx'
import { useContext } from 'react';
import Loading from './loading.gif'
import Cross from './cross.png'
import tryon from './tryon.png'
const Home = () => {
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({ price_filter: 'All', category_filter: 'All' })
  const { details, setDetails, showFilter, setShowFilter } = useContext(context)
  const [images, setImages] = useState({ person: '', cloth: '' })
  const [image, setImage] = useState('')
  const [showTryOn, setShowTryOn] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {

    const getData = async () => {
      const res = await axios.get('https://ecommerce-ashy-ten.vercel.app/api/general/getProducts')
      if (res) {
        setProducts(res.data.products)
      }
    }

    getData()

  }, [])

  const handleFilter = (e) => {

    setFilters({ ...filters, [e.target.name]: e.target.value })
  }



  const addToCart = () => {

  }

  const discoverDetails = (pid) => {
    setDetails({ ...details, productId: pid })
    navigate('/detailPage')
  }

  const handleImage = (e) => {

    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result.replace('data:image/jpeg;base64,', "");
      setImages({ ...images, [e.target.name]: base64 });
      // console.log('e.target.name',e.target.name)
      console.log('e.target', e.target)
      // console.log('image', base64)
      // console.log('image',images)
    }

    reader.readAsDataURL(file);

    // const imageURL = URL.createObjectURL(e.target.files[0])
    // const file = new File()
    // console.log('e.target.files[0]:',file) 

    // setImages({...images,[e.target.name]:imageURL})
  }

  useEffect(() => {
    console.log('images', images)
  })

  const charu = () => {
    console.log('charu', images)
  }

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop
    // e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    // const files = e.dataTransfer.getData('url')
    console.log('e.target.value', e.target)
    const imageType = e.target.getAttribute('image-type')
    console.log('imageType=', imageType)
    setImages({ ...images, [imageType]: e.dataTransfer.getData('url') })
    // console.log('url',e.dataTransfer.getData('url'))
    // console.log('e ',e.target.id)
  };


  const handleImageDragStart = (e, url) => {
    e.dataTransfer.setData('url', url);
    // console.log('url',url)
  };

  const handleClothChange = () => {




    const api_key = "SG_de83d1141b1c99cd";
    const url = "https://api.segmind.com/v1/try-on-diffusion";

    const data = {
      // "model_image": "https://www.shutterstock.com/image-photo/full-length-portrait-young-handsome-260nw-2078934895.jpg",
      // "cloth_image": "https://www.shutterstock.com/image-photo/full-length-body-size-view-260nw-1522326935.jpg",
      "model_image": images.person,
      "cloth_image": images.cloth,
      "category": "Upper body",
      "num_inference_steps": 35,
      "guidance_scale": 2,
      "seed": 12467,
      "base64": true
    };

    (async function () {
      try {
        console.log('two')
        const response = await axios.post(url, data, { headers: { 'x-api-key': api_key } });
        console.log('success', response);
        console.log('response.data.image', response.data.image)
        setImage(response.data.image)
      } catch (error) {
        console.log('error', error)
      }
    })();

  }

  const closeImage = () => {
    setImage('')
  }

  const handleTryOn = () => {
    setShowTryOn(prevState => !prevState)
  }

  return (
    <>

      <div className="w-full h-[130vh] py-[-10px] flex">
        <div className="range:hidden flex flex-col justify-start items-center px-[10px] ">
          <div className='text-[18px]  text-start  w-full p-[10px]'>Price Filter</div>
          <div className='flex justify-center rounded-[10px] w-[200px] h-[300px] border border-solid border-gray-100' style={{ boxShadow: '0px 0px 6px 0px gray' }}>

            <div className='price-container flex flex-col gap-[10px] py-[5px]'>
              <div ><input type='radio' name='price_filter' value='All' onChange={(e) => { handleFilter(e) }} /><div>All</div></div>
              <div ><input type='radio' name='price_filter' value='1-100' onChange={(e) => { handleFilter(e) }} /><div>1-100 ₹</div></div>
              <div><input type='radio' name='price_filter' value='100-500' onChange={(e) => { handleFilter(e) }} /><div>100-500 ₹</div></div>
              <div><input type='radio' name='price_filter' value='500-1000' onChange={(e) => { handleFilter(e) }} /><div>500-1000 ₹</div></div>
              <div><input type='radio' name='price_filter' value='1000-5000' onChange={(e) => { handleFilter(e) }} /><div>1000-5000 ₹</div></div>
              <div><input type='radio' name='price_filter' value='5000-10000' onChange={(e) => { handleFilter(e) }} /> <div>5000-10000 ₹</div></div>
              <div><input type='radio' name='price_filter' value='10000-50000' onChange={(e) => { handleFilter(e) }} /><div>10000-50000 ₹</div></div>
            </div>

          </div>
          <div className='text-[18px] w-full p-[10px]'>Category Filter</div>
          <div className='flex justify-center rounded-[10px] w-[200px] h-[250px] border border-solid border-gray-100 ' style={{ boxShadow: '0px 0px 6px 0px gray' }}>
            <div className='price-container flex flex-col gap-[10px] py-[5px]'>
              <div ><input type='radio' name='category_filter' value='All' onChange={(e) => { handleFilter(e) }} /><div>All</div></div>
              <div ><input type='radio' name='category_filter' value='Health' onChange={(e) => { handleFilter(e) }} /><div>Health ₹</div></div>
              <div><input type='radio' name='category_filter' value='Clothes' onChange={(e) => { handleFilter(e) }} /><div>Clothes ₹</div></div>
              <div><input type='radio' name='category_filter' value='Accessaries' onChange={(e) => { handleFilter(e) }} /><div>Accessaries ₹</div></div>
              <div><input type='radio' name='category_filter' value='Sports' onChange={(e) => { handleFilter(e) }} /><div>Sports ₹</div></div>
              <div><input type='radio' name='category_filter' value='Cosmatics' onChange={(e) => { handleFilter(e) }} /> <div>Cosmatics ₹</div></div>
            </div>
          </div>
        </div>
        {/* <h1>{showFilter}</h1> */}
        {showFilter &&

          <div className="absolute rounded-[6px] bg-[#2e4964] z-10 left-[0px] top-[0px] px-[20px] py-[20px] flex flex-col" style={{ boxShadow: '1px 1px 30px 1px gray' }}>
            <div className='self-end border ' onClick={() => { setShowFilter(false) }}><img src={Cross} width='30px' className='border-r-[5px] border-white' /></div>
            <div className='text-[18px] text-white font-bold'>Price Filter</div>
            <div className='flex justify-around'>
              <div className='price-container-menu flex flex-col pt-[10px]'>
                <div ><input type='radio' name='price_filter' value='All' onChange={(e) => { handleFilter(e) }} /><div>All</div></div>
                <div ><input type='radio' name='price_filter' value='1-100' onChange={(e) => { handleFilter(e) }} /><div>1-100 ₹</div></div>
                <div><input type='radio' name='price_filter' value='100-500' onChange={(e) => { handleFilter(e) }} /><div>100-500 ₹</div></div>
                <div><input type='radio' name='price_filter' value='500-1000' onChange={(e) => { handleFilter(e) }} /><div>500-1000 ₹</div></div>
                <div><input type='radio' name='price_filter' value='1000-5000' onChange={(e) => { handleFilter(e) }} /><div>1000-5000 ₹</div></div>
                <div><input type='radio' name='price_filter' value='5000-10000' onChange={(e) => { handleFilter(e) }} /> <div>5000-10000 ₹</div></div>
                <div><input type='radio' name='price_filter' value='10000-50000' onChange={(e) => { handleFilter(e) }} /><div>10000-50000 ₹</div></div>
              </div>

            </div>
            <div className='h-[30px]'></div>
            <div className='text-[18px] text-white font-bold'>Category Filter</div>

            <div className='price-container-menu flex flex-col pt-[10px]'>
              <div ><input type='radio' name='category_filter' value='All' onChange={(e) => { handleFilter(e) }} /><div>All</div></div>
              <div ><input type='radio' name='category_filter' value='Health' onChange={(e) => { handleFilter(e) }} /><div>Health ₹</div></div>
              <div><input type='radio' name='category_filter' value='Clothes' onChange={(e) => { handleFilter(e) }} /><div>Clothes ₹</div></div>
              <div><input type='radio' name='category_filter' value='Accessaries' onChange={(e) => { handleFilter(e) }} /><div>Accessaries ₹</div></div>
              <div><input type='radio' name='category_filter' value='Sports' onChange={(e) => { handleFilter(e) }} /><div>Sports ₹</div></div>
              <div><input type='radio' name='category_filter' value='Cosmatics' onChange={(e) => { handleFilter(e) }} /> <div>Cosmatics ₹</div></div>
            </div>
          </div>
        }
        {/* w-[900px] h-[500px] */}
        <div className="h-[100vh] w-full flex flex-row flex-wrap justify-around justify-first overflow-auto scroll px-[20px]">


          {products.length > 0 ?
            (
              products.map((ele, ind) => (

                (
                  (filters.category_filter == 'All' || ele.cat == filters.category_filter) &&
                  (filters.price_filter == 'All' || (
                    Number(filters.price_filter.split('-')[0]) <= ele.price &&
                    ele.price <= Number(filters.price_filter.split('-')[1])
                  )
                  )
                )
                && (

                  <div key={ind} className="text-[20px] product-card  cursor-pointer transform transition-transform duration:300 hover:scale-110 w-[180px] h-[280px] p-[20px] my-[10px] flexRow" style={{ boxShadow: '0px 0px 6px 0px gray' }} onClick={() => discoverDetails(ele._id)}>
                    <img src={ele.image} alt="image" className="w-[150px] h-[150px]" draggable
                      onDragStart={(e) => handleImageDragStart(e, ele.image)} />
                    <div>
                      <div className="max-h-[30px] justify-content-center overflow-hidden text-font-medium text-gray-900 ">{ele.name}</div>
                      <div className="text-gray-700">
                        <span className="font-bold">₹{ele.price}</span>
                      </div>
                      <div className='flex flex-row'>
                        <span className="max-h-[30px] flex flex-row justify-content-center max-w-[220px] overflow-hidden text-gray-600">{ele.dis}</span>
                      </div>

                    </div>
                  </div>
                )



              ))
            ) :
            (
              <img src={Loading} width='300px' className='m-auto' />
            )
          }

        </div>

        {image ?
          <div className='w-[600px] h-[500px] overflow-auto border border-solid border-[red] absolute top-[70px] left-[250px]'>
            <img src={Cross} className='w-[50px] absolute top-[1px] right-[1px]' onClick={closeImage} />
            <img src={`data:image/jpeg;base64,${image}`} />
          </div>
          :
          null
        }

        {showTryOn ?
          <div className='border bg-[#dad8d8] w-[220px] h-[500px] absolute top-[60px] right-[100px] px-[10px] z-10 flex flex-col justify-around items-center'>
            <svg className='text-black charu absolute top-[1px] right-[1px]' onClick={() => { handleTryOn(); setImages({ person: '', cloth: '' }) }} width="20px" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
            <h1 className='text-white text-[15px]' >Image of Cloth</h1>





            {/* <input type='file' onChange={handleImage} name='person' className='w-[200px] h-[200px] rounded focus:outline-none focus:ring-2 focus:ring-blue-500'/> */}
            {/* <div className='bg-[red] w-[100px] h-[100px]' onDrop={handleDrop}
              onDragOver={handleDragOver}></div> */}

            {/* <img src={`data:image/jpeg;base64,${images.person}`} width='100px' />  */}


            <div className="flex items-center justify-center"          // onDrop={handleDrop}
            // onDragOver={handleDragOver}
            // id='person'
            >

              <label
                htmlFor="file-upload1"
                image-type='cloth'
                className="cursor-pointer flex flex-col items-center justify-center w-[200px] h-[200px] border border-solid border-black text-center"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {images.cloth ?
                  <img src={images.cloth} width="150px" image-type="cloth" /> :
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="mt-2 text-sm text-gray-600" name="cloth">Upload File</span>
                  </>
                }
              </label>
              <input
                id='file-upload1'
                type="file"
                onChange={handleImage}
                name="cloth"
                className="hidden"
              />
            </div>


            <h1 className='text-[15px] text-white' >Image of Person</h1>


            <div className="flex items-center justify-center"
            >
              <label
                htmlFor="file-upload2"
                // name='cloth'
                className="cursor-pointer flex flex-col items-center justify-center w-[200px] h-[200px] border border-solid border-black text-center"
              >
                {images.person ? <img src={`data:image/jpeg;base64,${images.person}`} width='150px' /> :
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="mt-2 text-sm text-gray-600">Upload File</span>
                  </>}
              </label>
              <input
                id='file-upload2'
                type="file"
                onChange={handleImage}
                image-type='person'
                name='person'
                className="hidden"
              />
            </div>




            {/* <input type='file' onChange={handleImage} name='cloth' className='w-[200px] h-[200px] rounded focus:outline-none focus:ring-2 focus:ring-blue-500'/>
        {images.cloth && <img src={`data:image/jpeg;base64,${images.cloth}`} width='100px' />} */}


            <button onClick={handleClothChange} className='border border-solid border-black rounded-[10px] px-[10px] text-[15px]' >Replace</button>




            {/* {image ? <img src={`data:image/jpeg;base64,${image}`} />:<h1>Loading</h1> } */}
            {/* <button onClick={charu}>Charu</button>  */}
          </div>
          :
          <div className='flex flex-col items-center absolute group top-[70px] right-[-30px] hover:right-[10px] transition-all duration-[0.8s] '>
            <img src={tryon} width='70px' onClick={handleTryOn} />
            <h1 className='hidden transition-all duration-[2s] group-hover:block text-[20px]'>Try On Feature</h1>
          </div>
        }
      </div>
    </>
  )
}

export default Home;


