import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

const AddAuthor = (props) => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            toast.error("Vui lòng nhập đủ các trường !!")
            return;
        }
        axios.post(`http://localhost:8081/author/add/${props.userName}`, { name: name }, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setName("");
                toast.success("Thêm thông tin tác giả thành công");
            }
        }).catch((error) => {
            toast.error(error.response.data);
            toast.error("Thêm thông tin tác giả thất bại");
        })
    };
    const handleOnClickClose = () => {
        window.location.reload();
        handleClose();
    }
    return (
        <>
            <Button variant="none" onClick={handleShow} className='btn btn-outline-info'>
                Thêm thông tin
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='col-md-9 offset-md-1 d-flex gap-2 mt-2 justify-content-end'>
                                <button className='btn btn-outline-secondary' type='submit'>Thêm</button>
                                <button className='btn btn-outline-primary' type='button' onClick={() => handleOnClickClose()} > Trở về</button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal >
        </>
    );
}
export default AddAuthor;