import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

const EditBook = (props) => {
    const [show, setShow] = useState(false);
    const [dataAuthor, setDataAuthor] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [file, setFile] = useState();
    const [data, setData] = useState({
        id: "",
        name: "",
        description: "",
        price: "",
        priceend: "",
        count: "",
        sale: "",
        action: "",
        publicationdate: "",
        author: {
            id: ""
        },
        category: {
            id: ""
        }
    });
    useEffect(() => {
        getAuthor();
        getCategory();
        setData({
            id: props.value.id,
            name: props.value.name,
            description: props.value.description,
            price: props.value.price,
            priceend: 0,
            count: props.value.count,
            sale: props.value.sale,
            action: props.value.action,
            publicationdate: props.value.publicationdate,
            author: {
                id: props.value.author.id
            },
            category: {
                id: props.value.category.id
            }
        })
    }, [])
    useEffect(() => {
        if (data.price && data.sale && parseInt(data.price) >= parseInt(data.sale)) {
            setData({
                ...data, priceend: (data.price - data.sale)
            })
        } else if (parseInt(data.price) < parseInt(data.sale)) {
            setData({
                ...data, priceend: (0)
            })
        }
    }, [data.price, data.sale])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isDataEmpty(data) && !data.author.id && !data.category.id) {
            toast.error("Vui lòng nhập đủ các trường !!");
            return;
        }
        if (parseInt(data.price) < parseInt(data.sale)) {
            toast.error("Giảm giá phải nhỏ hơn hoặc bằng giá bán !!");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        formData.append("nameFile", props.value.imagefile)
        axios.post("http://localhost:8081/book/updateimg", formData, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then((response) => {
            var array = { ...data, imagefile: response.data }
            axios.put(`http://localhost:8081/book/update/${props.userName}`, array, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                }
            }).then(() => {
                toast.success("Sửa thành công sách");
                setData({
                    id: "",
                    name: "",
                    description: "",
                    price: "",
                    priceend: "",
                    count: "",
                    sale: "",
                    action: "",
                    publicationdate: "",
                    author: {
                        id: ""
                    },
                    category: {
                        id: ""
                    }
                });
                setFile("");
                setTimeout(() => {
                    window.location.reload();
                }, [1000])
            }).catch((error) => {
                if (!error.response.data) {
                    toast.error(error.response.data);
                }
                toast.error("Sửa sách thất bại");
            })
        }).catch(() => {
            toast.error("Lỗi sửa hình ảnh");
        })
    };
    const handleOnClickClose = () => {
        handleClose();
    }
    const getAuthor = async () => {
        await axios.get("http://localhost:8081/author/get", {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((response) => {
            setDataAuthor(response.data);
        })
    }
    const getCategory = async () => {
        await axios.get("http://localhost:8081/category/get", {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((response) => {
            setDataCategory(response.data);
        })
    }
    const isDataEmpty = (data) => {
        for (const key in data) {
            if (!data[key]) {
                return false;
            }
        }
        return true;
    }
    return (
        <>
            <Button variant="none" onClick={handleShow} className='btn btn-outline-info'>
                Sửa
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title>Sửa thông tin tác giả</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className='container'>
                            <div className='col-md-9 offset-md-1'>
                                <label>Name:</label>
                                <input className='form-control' type='text'
                                    placeholder='Nhập tên tác giả'
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                />
                            </div>
                            <div className='col-md-9 offset-md-1'>
                                <label>Tệp ảnh:</label>
                                <input className='form-control' type='file'
                                    placeholder='Nhập tệp sách'
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                            <div className='col-md-9 offset-md-1'>
                                <label>Mô tả:</label>
                                <textarea className='form-control' type='text'
                                    placeholder='Nhập mô tả'
                                    value={data.description}
                                    onChange={(e) => setData({ ...data, description: e.target.value })}
                                />
                            </div>
                            <div className='col-md-10 offset-md-1'>
                                <label>Tác dụng:</label>
                                <textarea className='form-control' type='text'
                                    placeholder='Nhập tác dụng'
                                    value={data.action}
                                    onChange={(e) => setData({ ...data, action: e.target.value })}
                                />
                            </div>
                            <div className='col-md-9 offset-md-1'>
                                <label>Ngày SB:</label>
                                <input className='form-control' type='date'
                                    value={data.publicationdate}
                                    onChange={(e) => setData({ ...data, publicationdate: e.target.value })}
                                />
                            </div>
                            <div className='col-md-9 offset-md-1 my-2'>
                                <label>Tác giả:</label>
                                <select className='text-center' defaultValue={!data.author.id ? "default" : data.author.id}
                                    onChange={(e) => setData({ ...data, author: { id: e.target.value } })}>
                                    <option value={"default"} >Chọn tác giả</option>
                                    {dataAuthor && dataAuthor.map((value, index) => {
                                        return (
                                            <option value={value.id} key={index}>{value.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-md-9 offset-md-1'>
                                <label>Thể loại:</label>
                                <select className='text-center' defaultValue={!data.category.id ? "default" : data.category.id}
                                    onChange={(e) => setData({ ...data, category: { id: e.target.value } })}>
                                    <option value={"default"} >Chọn thể loại</option>
                                    {dataCategory && dataCategory.map((value, index) => {
                                        return (
                                            <option value={value.id} key={index}>{value.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-md-9 offset-md-1'>
                                <label>Giá:</label>
                                <input className='form-control' type='number'
                                    placeholder='Nhập giá:'
                                    value={data.price}
                                    onChange={(e) => setData({ ...data, price: e.target.value })}
                                />
                            </div>
                            <div className='col-md-9 offset-md-1'>
                                <label>Số lượng:</label>
                                <input className='form-control' type='number'
                                    placeholder='Nhập số lượng'
                                    value={data.count}
                                    onChange={(e) => setData({ ...data, count: e.target.value })}
                                />
                            </div>
                            <div className='col-md-10 offset-md-1'>
                                <label>Giảm giá:</label>
                                <input className='form-control' type='text' max={data.price}
                                    placeholder='Nhập giảm giá'
                                    value={(data.sale)}
                                    onChange={(e) => setData({ ...data, sale: e.target.value })}
                                />
                            </div>
                            <div className='col-md-10 offset-md-1'>
                                <label>Giá cuối:</label>
                                <input className='form-control' type='text'
                                    readOnly
                                    placeholder='Nhập giá bán và giảm giá để tự động tính'
                                    value={(data.priceend).toLocaleString('vi-VN') + " VND"}
                                />
                            </div>
                            <div className='col-md-9 offset-md-1 d-flex gap-2 mt-2 justify-content-end'>
                                <button className='btn btn-outline-secondary' type='submit'>Sửa</button>
                                <button className='btn btn-outline-primary' type='button' onClick={() => handleOnClickClose()} > Trở về</button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal >
        </>
    );
}
export default EditBook;