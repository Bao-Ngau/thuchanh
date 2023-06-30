import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

const EditCategory = (props) => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    useEffect(() => {
        if (show) {
            setName(props.value.name);
        }
    }, [show])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const data = {
        id: props.value.id,
        name: name
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            toast.error("Vui lòng nhập đủ các trường !!");
            return;
        }
        axios.put(`http://localhost:8081/category/update/${props.userName}`, data, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setName("");
                toast.success("Sửa thông tin thể loại thành công");
                setTimeout(() => {
                    window.location.reload();
                }, [1500])
            }
        }).catch((error) => {
            toast.error(error.response.data);
            toast.error("Sửa thông tin thể loại thất bại");
        })
    };
    const handleOnClickClose = () => {
        handleClose();
    }

    return (
        <>
            <Button variant="none" onClick={handleShow} className='btn btn-outline-info'>
                Sửa
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sửa thông tin thể loại</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className='container'>
                            <div className='col-md-9 offset-md-1'>
                                <label>Name:</label>
                                <input className='form-control' type='text'
                                    placeholder='Nhập tên thể loại'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
export default EditCategory;