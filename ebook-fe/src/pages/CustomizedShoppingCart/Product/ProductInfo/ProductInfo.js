import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
// import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import './ProductInfo.scss'
import CartIcon from '../../../../img/icon-cart.svg'
// import CartIcon from '../ProductInfo/icon-cart.svg'
import TrialIcon from '../../../../img/icon-trial.svg'
import HeartIcon from '../../../../img/icon-heart.svg'
import { Modal, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
// import { DATA } from './MockData'
// import MemberComment from './MemberComment/MemberComment'

import productsDetail from '../../data/products.json'

import { useCart } from '../../utils/useCart'
import { useSecondCart } from '../../utils/useSecondCart'
import { useState, useParam } from 'react'

function ProductInfo(productId) {
  function CreateBookInfo(v) {
    // 對話盒使用
    const [show, setShow] = useState(false)
    // 對話盒中的商品名稱
    const [product, setProduct] = useState('')
    const [productName, setProductName] = useState('')

    const navigate = useNavigate()

    const { addItem } = useCart()
    const { addSecondItem } = useSecondCart()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const showModal = (name) => {
      setProductName('產品：' + name + '已成功加入購物車')
      handleShow()
    }
    const messageModal = (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>加入購物車訊息</Modal.Title>
        </Modal.Header>
        <Modal.Body>已成功加入購物車</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
          繼續購物
          </Button>
          <Button variant="primary" 
          onClick={() => {
              // 導向購物車頁面
              // props.history.push('/')
              navigate('/Cart')
            }}>
          前往購物車結帳
          </Button>
        </Modal.Footer>
      </Modal>
    )

    const messageModal2 = (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>加入購物車訊息</Modal.Title>
        </Modal.Header>
        <Modal.Body>{productName} </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            繼續購物
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              // 導向購物車頁面
              // props.history.push('/')
              navigate('/Cart', { replace: true })
            }}
          >
            前往購物車結帳
          </Button>
        </Modal.Footer>
      </Modal>
    )

    const showModal2 = (name) => {
      setProductName('產品：' + name + '已成功加入收藏')
      handleShow()
    }

    return (
      <>
        {/* /// */}
        {/* <Button className="btn-danger" variant="" onClick={handleShow}>
        購買
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>加入購物車訊息</Modal.Title>
        </Modal.Header>
        <Modal.Body>已成功加入購物車</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
          繼續購物
          </Button>
          <Button variant="primary" onClick={() => {
              // 導向購物車頁面
              // props.history.push('/')
              navigate('/Cart', { replace: true })
            }}>
          前往購物車結帳
          </Button>
        </Modal.Footer>
      </Modal>
        {/* /// */}

        <Row className="mb-5">
          <Col>
            <img className="ProductInfo-img" src={v.book_img} alt="商品圖" />
          </Col>
          <Col>
            <div>
              <div className="ProductInfo-title">{v.book_name}</div>
              <div className="ProductInfo-subTitle">{v.book_subtitle}</div>
              <div className="ProductInfo-bookInfo">作者：{v.author}</div>
              <div className="ProductInfo-bookInfo">譯者：{v.translator}</div>
              <div className="ProductInfo-bookInfo">出版社：{v.publisher}</div>
              <div className="ProductInfo-bookInfo">
                出版日期：{v.publication_date}
              </div>
              <div className="ProductInfo-bookInfo">語言：{v.language}</div>
              <div className="ProductInfo-bookInfo">
                售價：<span>$</span>
                <span className="ProductInfo-bookInfo-price">{v.price}</span>
              </div>
              <div className="ProductInfo-btn-position">
                <ButtonToolbar className="mt-5 ">
                  <ButtonGroup className="me-2 ">
                    <Button
                      className="btn-danger me-2 mb-2"
                      onClick={() => {
                        // 商品原本無數量屬性(quantity)，要先加上
                        const item = { ...v, quantity: 1 }
                        // 注意: 重覆加入會自動+1產品數量
                        addItem(item)
                        // 呈現跳出對話盒
                        showModal(v.name)
                      }}
                    >
                      <img src={CartIcon} alt="buy" />
                      購買
                    </Button>
                  </ButtonGroup>

                  <ButtonGroup className="me-2">
                    <Button className="btn-danger me-2 mb-2">
                      <img src={TrialIcon} alt="trial" /> 試閱
                    </Button>
                  </ButtonGroup>
                  <ButtonGroup className="me-2">
                    <Button className="btn-danger mb-2">
                      <img src={HeartIcon} alt="heart" /> 收藏
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <ButtonGroup className="mb-4">
              <a href="#detail">
                <Button className="btn-primary" size="m">
                  詳細書訊
                </Button>
              </a>
              <a href="#aboutAuthor">
                <Button className="btn-primary" size="m">
                  作者簡介
                </Button>
              </a>
              <a href="#aboutTranslator">
                <Button className="btn-primary" size="m">
                  譯者簡介
                </Button>
              </a>
              <a href="#recommended">
                <Button className="btn-primary" size="m">
                  好評推薦
                </Button>
              </a>
            </ButtonGroup>
            <div className="ProductInfo-detail "></div>
            <h4 className="ProductInfo-font-weight" id="detail">
              詳細書訊
            </h4>
            <svg
              className="img-fluid"
              width="1356"
              height="12"
              viewBox="0 0 1356 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1355.77 6L1350 0.226497L1344.23 6L1350 11.7735L1355.77 6ZM0 7H1.99704V5H0V7ZM5.99112 7H9.98521V5H5.99112V7ZM13.9793 7H17.9734V5H13.9793V7ZM21.9675 7H25.9615V5H21.9675V7ZM29.9556 7H33.9497V5H29.9556V7ZM37.9438 7H41.9379V5H37.9438V7ZM45.932 7H49.926V5H45.932V7ZM53.9201 7H57.9142V5H53.9201V7ZM61.9083 7H65.9024V5H61.9083V7ZM69.8964 7H73.8905V5H69.8964V7ZM77.8846 7H81.8787V5H77.8846V7ZM85.8728 7H89.8668V5H85.8728V7ZM93.8609 7H97.855V5H93.8609V7ZM101.849 7H105.843V5H101.849V7ZM109.837 7H113.831V5H109.837V7ZM117.825 7H121.819V5H117.825V7ZM125.814 7H129.808V5H125.814V7ZM133.802 7H137.796V5H133.802V7ZM141.79 7H145.784V5H141.79V7ZM149.778 7H153.772V5H149.778V7ZM157.766 7H161.76V5H157.766V7ZM165.754 7H169.748V5H165.754V7ZM173.743 7H177.737V5H173.743V7ZM181.731 7H185.725V5H181.731V7ZM189.719 7H193.713V5H189.719V7ZM197.707 7H201.701V5H197.707V7ZM205.695 7H209.689V5H205.695V7ZM213.683 7H217.677V5H213.683V7ZM221.671 7H225.666V5H221.671V7ZM229.66 7H233.654V5H229.66V7ZM237.648 7H241.642V5H237.648V7ZM245.636 7H249.63V5H245.636V7ZM253.624 7H257.618V5H253.624V7ZM261.612 7H265.606V5H261.612V7ZM269.6 7H273.595V5H269.6V7ZM277.589 7H281.583V5H277.589V7ZM285.577 7H289.571V5H285.577V7ZM293.565 7H297.559V5H293.565V7ZM301.553 7H305.547V5H301.553V7ZM309.541 7H313.535V5H309.541V7ZM317.529 7H321.523V5H317.529V7ZM325.518 7H329.512V5H325.518V7ZM333.506 7H337.5V5H333.506V7ZM341.494 7H345.488V5H341.494V7ZM349.482 7H353.476V5H349.482V7ZM357.47 7H361.464V5H357.47V7ZM365.458 7H369.452V5H365.458V7ZM373.446 7H377.441V5H373.446V7ZM381.435 7H385.429V5H381.435V7ZM389.423 7H393.417V5H389.423V7ZM397.411 7H401.405V5H397.411V7ZM405.399 7H409.393V5H405.399V7ZM413.387 7H417.381V5H413.387V7ZM421.375 7H425.37V5H421.375V7ZM429.364 7H433.358V5H429.364V7ZM437.352 7H441.346V5H437.352V7ZM445.34 7H449.334V5H445.34V7ZM453.328 7H457.322V5H453.328V7ZM461.316 7H465.31V5H461.316V7ZM469.304 7H473.298V5H469.304V7ZM477.293 7H481.287V5H477.293V7ZM485.281 7H489.275V5H485.281V7ZM493.269 7H497.263V5H493.269V7ZM501.257 7H505.251V5H501.257V7ZM509.245 7H513.239V5H509.245V7ZM517.233 7H521.227V5H517.233V7ZM525.222 7H529.216V5H525.222V7ZM533.21 7H537.204V5H533.21V7ZM541.198 7H545.192V5H541.198V7ZM549.186 7H553.18V5H549.186V7ZM557.174 7H561.168V5H557.174V7ZM565.162 7H569.156V5H565.162V7ZM573.15 7H577.145V5H573.15V7ZM581.139 7H585.133V5H581.139V7ZM589.127 7H593.121V5H589.127V7ZM597.115 7H601.109V5H597.115V7ZM605.103 7H609.097V5H605.103V7ZM613.091 7H617.085V5H613.091V7ZM621.079 7H625.074V5H621.079V7ZM629.068 7H633.062V5H629.068V7ZM637.056 7H641.05V5H637.056V7ZM645.044 7H649.038V5H645.044V7ZM653.032 7H657.026V5H653.032V7ZM661.02 7H665.014V5H661.02V7ZM669.008 7H673.002V5H669.008V7ZM676.997 7H680.991V5H676.997V7ZM684.985 7H688.979V5H684.985V7ZM692.973 7H696.967V5H692.973V7ZM700.961 7H704.955V5H700.961V7ZM708.949 7H712.943V5H708.949V7ZM716.937 7H720.931V5H716.937V7ZM724.926 7H728.92V5H724.926V7ZM732.914 7H736.908V5H732.914V7ZM740.902 7H744.896V5H740.902V7ZM748.89 7H752.884V5H748.89V7ZM756.878 7H760.872V5H756.878V7ZM764.866 7H768.86V5H764.866V7ZM772.854 7H776.849V5H772.854V7ZM780.843 7H784.837V5H780.843V7ZM788.831 7H792.825V5H788.831V7ZM796.819 7H800.813V5H796.819V7ZM804.807 7H808.801V5H804.807V7ZM812.795 7H816.789V5H812.795V7ZM820.783 7H824.777V5H820.783V7ZM828.772 7H832.766V5H828.772V7ZM836.76 7H840.754V5H836.76V7ZM844.748 7H848.742V5H844.748V7ZM852.736 7H856.73V5H852.736V7ZM860.724 7H864.718V5H860.724V7ZM868.712 7H872.706V5H868.712V7ZM876.701 7H880.695V5H876.701V7ZM884.689 7H888.683V5H884.689V7ZM892.677 7H896.671V5H892.677V7ZM900.665 7H904.659V5H900.665V7ZM908.653 7H912.647V5H908.653V7ZM916.641 7H920.635V5H916.641V7ZM924.63 7H928.624V5H924.63V7ZM932.618 7H936.612V5H932.618V7ZM940.606 7H944.6V5H940.606V7ZM948.594 7H952.588V5H948.594V7ZM956.582 7H960.576V5H956.582V7ZM964.57 7H968.564V5H964.57V7ZM972.558 7H976.553V5H972.558V7ZM980.547 7H984.541V5H980.547V7ZM988.535 7H992.529V5H988.535V7ZM996.523 7H1000.52V5H996.523V7ZM1004.51 7H1008.51V5H1004.51V7ZM1012.5 7H1016.49V5H1012.5V7ZM1020.49 7H1024.48V5H1020.49V7ZM1028.48 7H1032.47V5H1028.48V7ZM1036.46 7H1040.46V5H1036.46V7ZM1044.45 7H1048.45V5H1044.45V7ZM1052.44 7H1056.43V5H1052.44V7ZM1060.43 7H1064.42V5H1060.43V7ZM1068.42 7H1072.41V5H1068.42V7ZM1076.41 7H1080.4V5H1076.41V7ZM1084.39 7H1088.39V5H1084.39V7ZM1092.38 7H1096.38V5H1092.38V7ZM1100.37 7H1104.36V5H1100.37V7ZM1108.36 7H1112.35V5H1108.36V7ZM1116.35 7H1120.34V5H1116.35V7ZM1124.34 7H1128.33V5H1124.34V7ZM1132.32 7H1136.32V5H1132.32V7ZM1140.31 7H1144.31V5H1140.31V7ZM1148.3 7H1152.29V5H1148.3V7ZM1156.29 7H1160.28V5H1156.29V7ZM1164.28 7H1168.27V5H1164.28V7ZM1172.26 7H1176.26V5H1172.26V7ZM1180.25 7H1184.25V5H1180.25V7ZM1188.24 7H1192.24V5H1188.24V7ZM1196.23 7H1200.22V5H1196.23V7ZM1204.22 7H1208.21V5H1204.22V7ZM1212.21 7H1216.2V5H1212.21V7ZM1220.19 7H1224.19V5H1220.19V7ZM1228.18 7H1232.18V5H1228.18V7ZM1236.17 7H1240.17V5H1236.17V7ZM1244.16 7H1248.15V5H1244.16V7ZM1252.15 7H1256.14V5H1252.15V7ZM1260.14 7H1264.13V5H1260.14V7ZM1268.12 7H1272.12V5H1268.12V7ZM1276.11 7H1280.11V5H1276.11V7ZM1284.1 7H1288.09V5H1284.1V7ZM1292.09 7H1296.08V5H1292.09V7ZM1300.08 7H1304.07V5H1300.08V7ZM1308.07 7H1312.06V5H1308.07V7ZM1316.05 7H1320.05V5H1316.05V7ZM1324.04 7H1328.04V5H1324.04V7ZM1332.03 7H1336.02V5H1332.03V7ZM1340.02 7H1344.01V5H1340.02V7ZM1348.01 7H1350V5H1348.01V7Z"
                fill="#661F1E"
              />
            </svg>
            <p className="mb-5">{v.book_details}</p>

            <h4 className="ProductInfo-font-weight" id="aboutAuthor">
              作者簡介
            </h4>
            <svg
              className="img-fluid"
              width="1356"
              height="12"
              viewBox="0 0 1356 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1355.77 6L1350 0.226497L1344.23 6L1350 11.7735L1355.77 6ZM0 7H1.99704V5H0V7ZM5.99112 7H9.98521V5H5.99112V7ZM13.9793 7H17.9734V5H13.9793V7ZM21.9675 7H25.9615V5H21.9675V7ZM29.9556 7H33.9497V5H29.9556V7ZM37.9438 7H41.9379V5H37.9438V7ZM45.932 7H49.926V5H45.932V7ZM53.9201 7H57.9142V5H53.9201V7ZM61.9083 7H65.9024V5H61.9083V7ZM69.8964 7H73.8905V5H69.8964V7ZM77.8846 7H81.8787V5H77.8846V7ZM85.8728 7H89.8668V5H85.8728V7ZM93.8609 7H97.855V5H93.8609V7ZM101.849 7H105.843V5H101.849V7ZM109.837 7H113.831V5H109.837V7ZM117.825 7H121.819V5H117.825V7ZM125.814 7H129.808V5H125.814V7ZM133.802 7H137.796V5H133.802V7ZM141.79 7H145.784V5H141.79V7ZM149.778 7H153.772V5H149.778V7ZM157.766 7H161.76V5H157.766V7ZM165.754 7H169.748V5H165.754V7ZM173.743 7H177.737V5H173.743V7ZM181.731 7H185.725V5H181.731V7ZM189.719 7H193.713V5H189.719V7ZM197.707 7H201.701V5H197.707V7ZM205.695 7H209.689V5H205.695V7ZM213.683 7H217.677V5H213.683V7ZM221.671 7H225.666V5H221.671V7ZM229.66 7H233.654V5H229.66V7ZM237.648 7H241.642V5H237.648V7ZM245.636 7H249.63V5H245.636V7ZM253.624 7H257.618V5H253.624V7ZM261.612 7H265.606V5H261.612V7ZM269.6 7H273.595V5H269.6V7ZM277.589 7H281.583V5H277.589V7ZM285.577 7H289.571V5H285.577V7ZM293.565 7H297.559V5H293.565V7ZM301.553 7H305.547V5H301.553V7ZM309.541 7H313.535V5H309.541V7ZM317.529 7H321.523V5H317.529V7ZM325.518 7H329.512V5H325.518V7ZM333.506 7H337.5V5H333.506V7ZM341.494 7H345.488V5H341.494V7ZM349.482 7H353.476V5H349.482V7ZM357.47 7H361.464V5H357.47V7ZM365.458 7H369.452V5H365.458V7ZM373.446 7H377.441V5H373.446V7ZM381.435 7H385.429V5H381.435V7ZM389.423 7H393.417V5H389.423V7ZM397.411 7H401.405V5H397.411V7ZM405.399 7H409.393V5H405.399V7ZM413.387 7H417.381V5H413.387V7ZM421.375 7H425.37V5H421.375V7ZM429.364 7H433.358V5H429.364V7ZM437.352 7H441.346V5H437.352V7ZM445.34 7H449.334V5H445.34V7ZM453.328 7H457.322V5H453.328V7ZM461.316 7H465.31V5H461.316V7ZM469.304 7H473.298V5H469.304V7ZM477.293 7H481.287V5H477.293V7ZM485.281 7H489.275V5H485.281V7ZM493.269 7H497.263V5H493.269V7ZM501.257 7H505.251V5H501.257V7ZM509.245 7H513.239V5H509.245V7ZM517.233 7H521.227V5H517.233V7ZM525.222 7H529.216V5H525.222V7ZM533.21 7H537.204V5H533.21V7ZM541.198 7H545.192V5H541.198V7ZM549.186 7H553.18V5H549.186V7ZM557.174 7H561.168V5H557.174V7ZM565.162 7H569.156V5H565.162V7ZM573.15 7H577.145V5H573.15V7ZM581.139 7H585.133V5H581.139V7ZM589.127 7H593.121V5H589.127V7ZM597.115 7H601.109V5H597.115V7ZM605.103 7H609.097V5H605.103V7ZM613.091 7H617.085V5H613.091V7ZM621.079 7H625.074V5H621.079V7ZM629.068 7H633.062V5H629.068V7ZM637.056 7H641.05V5H637.056V7ZM645.044 7H649.038V5H645.044V7ZM653.032 7H657.026V5H653.032V7ZM661.02 7H665.014V5H661.02V7ZM669.008 7H673.002V5H669.008V7ZM676.997 7H680.991V5H676.997V7ZM684.985 7H688.979V5H684.985V7ZM692.973 7H696.967V5H692.973V7ZM700.961 7H704.955V5H700.961V7ZM708.949 7H712.943V5H708.949V7ZM716.937 7H720.931V5H716.937V7ZM724.926 7H728.92V5H724.926V7ZM732.914 7H736.908V5H732.914V7ZM740.902 7H744.896V5H740.902V7ZM748.89 7H752.884V5H748.89V7ZM756.878 7H760.872V5H756.878V7ZM764.866 7H768.86V5H764.866V7ZM772.854 7H776.849V5H772.854V7ZM780.843 7H784.837V5H780.843V7ZM788.831 7H792.825V5H788.831V7ZM796.819 7H800.813V5H796.819V7ZM804.807 7H808.801V5H804.807V7ZM812.795 7H816.789V5H812.795V7ZM820.783 7H824.777V5H820.783V7ZM828.772 7H832.766V5H828.772V7ZM836.76 7H840.754V5H836.76V7ZM844.748 7H848.742V5H844.748V7ZM852.736 7H856.73V5H852.736V7ZM860.724 7H864.718V5H860.724V7ZM868.712 7H872.706V5H868.712V7ZM876.701 7H880.695V5H876.701V7ZM884.689 7H888.683V5H884.689V7ZM892.677 7H896.671V5H892.677V7ZM900.665 7H904.659V5H900.665V7ZM908.653 7H912.647V5H908.653V7ZM916.641 7H920.635V5H916.641V7ZM924.63 7H928.624V5H924.63V7ZM932.618 7H936.612V5H932.618V7ZM940.606 7H944.6V5H940.606V7ZM948.594 7H952.588V5H948.594V7ZM956.582 7H960.576V5H956.582V7ZM964.57 7H968.564V5H964.57V7ZM972.558 7H976.553V5H972.558V7ZM980.547 7H984.541V5H980.547V7ZM988.535 7H992.529V5H988.535V7ZM996.523 7H1000.52V5H996.523V7ZM1004.51 7H1008.51V5H1004.51V7ZM1012.5 7H1016.49V5H1012.5V7ZM1020.49 7H1024.48V5H1020.49V7ZM1028.48 7H1032.47V5H1028.48V7ZM1036.46 7H1040.46V5H1036.46V7ZM1044.45 7H1048.45V5H1044.45V7ZM1052.44 7H1056.43V5H1052.44V7ZM1060.43 7H1064.42V5H1060.43V7ZM1068.42 7H1072.41V5H1068.42V7ZM1076.41 7H1080.4V5H1076.41V7ZM1084.39 7H1088.39V5H1084.39V7ZM1092.38 7H1096.38V5H1092.38V7ZM1100.37 7H1104.36V5H1100.37V7ZM1108.36 7H1112.35V5H1108.36V7ZM1116.35 7H1120.34V5H1116.35V7ZM1124.34 7H1128.33V5H1124.34V7ZM1132.32 7H1136.32V5H1132.32V7ZM1140.31 7H1144.31V5H1140.31V7ZM1148.3 7H1152.29V5H1148.3V7ZM1156.29 7H1160.28V5H1156.29V7ZM1164.28 7H1168.27V5H1164.28V7ZM1172.26 7H1176.26V5H1172.26V7ZM1180.25 7H1184.25V5H1180.25V7ZM1188.24 7H1192.24V5H1188.24V7ZM1196.23 7H1200.22V5H1196.23V7ZM1204.22 7H1208.21V5H1204.22V7ZM1212.21 7H1216.2V5H1212.21V7ZM1220.19 7H1224.19V5H1220.19V7ZM1228.18 7H1232.18V5H1228.18V7ZM1236.17 7H1240.17V5H1236.17V7ZM1244.16 7H1248.15V5H1244.16V7ZM1252.15 7H1256.14V5H1252.15V7ZM1260.14 7H1264.13V5H1260.14V7ZM1268.12 7H1272.12V5H1268.12V7ZM1276.11 7H1280.11V5H1276.11V7ZM1284.1 7H1288.09V5H1284.1V7ZM1292.09 7H1296.08V5H1292.09V7ZM1300.08 7H1304.07V5H1300.08V7ZM1308.07 7H1312.06V5H1308.07V7ZM1316.05 7H1320.05V5H1316.05V7ZM1324.04 7H1328.04V5H1324.04V7ZM1332.03 7H1336.02V5H1332.03V7ZM1340.02 7H1344.01V5H1340.02V7ZM1348.01 7H1350V5H1348.01V7Z"
                fill="#661F1E"
              />
            </svg>
            <p className="mb-5">{v.author_details}</p>

            <h4 className="ProductInfo-font-weight" id="aboutTranslator">
              譯者簡介
            </h4>
            <svg
              className="img-fluid"
              width="1356"
              height="12"
              viewBox="0 0 1356 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1355.77 6L1350 0.226497L1344.23 6L1350 11.7735L1355.77 6ZM0 7H1.99704V5H0V7ZM5.99112 7H9.98521V5H5.99112V7ZM13.9793 7H17.9734V5H13.9793V7ZM21.9675 7H25.9615V5H21.9675V7ZM29.9556 7H33.9497V5H29.9556V7ZM37.9438 7H41.9379V5H37.9438V7ZM45.932 7H49.926V5H45.932V7ZM53.9201 7H57.9142V5H53.9201V7ZM61.9083 7H65.9024V5H61.9083V7ZM69.8964 7H73.8905V5H69.8964V7ZM77.8846 7H81.8787V5H77.8846V7ZM85.8728 7H89.8668V5H85.8728V7ZM93.8609 7H97.855V5H93.8609V7ZM101.849 7H105.843V5H101.849V7ZM109.837 7H113.831V5H109.837V7ZM117.825 7H121.819V5H117.825V7ZM125.814 7H129.808V5H125.814V7ZM133.802 7H137.796V5H133.802V7ZM141.79 7H145.784V5H141.79V7ZM149.778 7H153.772V5H149.778V7ZM157.766 7H161.76V5H157.766V7ZM165.754 7H169.748V5H165.754V7ZM173.743 7H177.737V5H173.743V7ZM181.731 7H185.725V5H181.731V7ZM189.719 7H193.713V5H189.719V7ZM197.707 7H201.701V5H197.707V7ZM205.695 7H209.689V5H205.695V7ZM213.683 7H217.677V5H213.683V7ZM221.671 7H225.666V5H221.671V7ZM229.66 7H233.654V5H229.66V7ZM237.648 7H241.642V5H237.648V7ZM245.636 7H249.63V5H245.636V7ZM253.624 7H257.618V5H253.624V7ZM261.612 7H265.606V5H261.612V7ZM269.6 7H273.595V5H269.6V7ZM277.589 7H281.583V5H277.589V7ZM285.577 7H289.571V5H285.577V7ZM293.565 7H297.559V5H293.565V7ZM301.553 7H305.547V5H301.553V7ZM309.541 7H313.535V5H309.541V7ZM317.529 7H321.523V5H317.529V7ZM325.518 7H329.512V5H325.518V7ZM333.506 7H337.5V5H333.506V7ZM341.494 7H345.488V5H341.494V7ZM349.482 7H353.476V5H349.482V7ZM357.47 7H361.464V5H357.47V7ZM365.458 7H369.452V5H365.458V7ZM373.446 7H377.441V5H373.446V7ZM381.435 7H385.429V5H381.435V7ZM389.423 7H393.417V5H389.423V7ZM397.411 7H401.405V5H397.411V7ZM405.399 7H409.393V5H405.399V7ZM413.387 7H417.381V5H413.387V7ZM421.375 7H425.37V5H421.375V7ZM429.364 7H433.358V5H429.364V7ZM437.352 7H441.346V5H437.352V7ZM445.34 7H449.334V5H445.34V7ZM453.328 7H457.322V5H453.328V7ZM461.316 7H465.31V5H461.316V7ZM469.304 7H473.298V5H469.304V7ZM477.293 7H481.287V5H477.293V7ZM485.281 7H489.275V5H485.281V7ZM493.269 7H497.263V5H493.269V7ZM501.257 7H505.251V5H501.257V7ZM509.245 7H513.239V5H509.245V7ZM517.233 7H521.227V5H517.233V7ZM525.222 7H529.216V5H525.222V7ZM533.21 7H537.204V5H533.21V7ZM541.198 7H545.192V5H541.198V7ZM549.186 7H553.18V5H549.186V7ZM557.174 7H561.168V5H557.174V7ZM565.162 7H569.156V5H565.162V7ZM573.15 7H577.145V5H573.15V7ZM581.139 7H585.133V5H581.139V7ZM589.127 7H593.121V5H589.127V7ZM597.115 7H601.109V5H597.115V7ZM605.103 7H609.097V5H605.103V7ZM613.091 7H617.085V5H613.091V7ZM621.079 7H625.074V5H621.079V7ZM629.068 7H633.062V5H629.068V7ZM637.056 7H641.05V5H637.056V7ZM645.044 7H649.038V5H645.044V7ZM653.032 7H657.026V5H653.032V7ZM661.02 7H665.014V5H661.02V7ZM669.008 7H673.002V5H669.008V7ZM676.997 7H680.991V5H676.997V7ZM684.985 7H688.979V5H684.985V7ZM692.973 7H696.967V5H692.973V7ZM700.961 7H704.955V5H700.961V7ZM708.949 7H712.943V5H708.949V7ZM716.937 7H720.931V5H716.937V7ZM724.926 7H728.92V5H724.926V7ZM732.914 7H736.908V5H732.914V7ZM740.902 7H744.896V5H740.902V7ZM748.89 7H752.884V5H748.89V7ZM756.878 7H760.872V5H756.878V7ZM764.866 7H768.86V5H764.866V7ZM772.854 7H776.849V5H772.854V7ZM780.843 7H784.837V5H780.843V7ZM788.831 7H792.825V5H788.831V7ZM796.819 7H800.813V5H796.819V7ZM804.807 7H808.801V5H804.807V7ZM812.795 7H816.789V5H812.795V7ZM820.783 7H824.777V5H820.783V7ZM828.772 7H832.766V5H828.772V7ZM836.76 7H840.754V5H836.76V7ZM844.748 7H848.742V5H844.748V7ZM852.736 7H856.73V5H852.736V7ZM860.724 7H864.718V5H860.724V7ZM868.712 7H872.706V5H868.712V7ZM876.701 7H880.695V5H876.701V7ZM884.689 7H888.683V5H884.689V7ZM892.677 7H896.671V5H892.677V7ZM900.665 7H904.659V5H900.665V7ZM908.653 7H912.647V5H908.653V7ZM916.641 7H920.635V5H916.641V7ZM924.63 7H928.624V5H924.63V7ZM932.618 7H936.612V5H932.618V7ZM940.606 7H944.6V5H940.606V7ZM948.594 7H952.588V5H948.594V7ZM956.582 7H960.576V5H956.582V7ZM964.57 7H968.564V5H964.57V7ZM972.558 7H976.553V5H972.558V7ZM980.547 7H984.541V5H980.547V7ZM988.535 7H992.529V5H988.535V7ZM996.523 7H1000.52V5H996.523V7ZM1004.51 7H1008.51V5H1004.51V7ZM1012.5 7H1016.49V5H1012.5V7ZM1020.49 7H1024.48V5H1020.49V7ZM1028.48 7H1032.47V5H1028.48V7ZM1036.46 7H1040.46V5H1036.46V7ZM1044.45 7H1048.45V5H1044.45V7ZM1052.44 7H1056.43V5H1052.44V7ZM1060.43 7H1064.42V5H1060.43V7ZM1068.42 7H1072.41V5H1068.42V7ZM1076.41 7H1080.4V5H1076.41V7ZM1084.39 7H1088.39V5H1084.39V7ZM1092.38 7H1096.38V5H1092.38V7ZM1100.37 7H1104.36V5H1100.37V7ZM1108.36 7H1112.35V5H1108.36V7ZM1116.35 7H1120.34V5H1116.35V7ZM1124.34 7H1128.33V5H1124.34V7ZM1132.32 7H1136.32V5H1132.32V7ZM1140.31 7H1144.31V5H1140.31V7ZM1148.3 7H1152.29V5H1148.3V7ZM1156.29 7H1160.28V5H1156.29V7ZM1164.28 7H1168.27V5H1164.28V7ZM1172.26 7H1176.26V5H1172.26V7ZM1180.25 7H1184.25V5H1180.25V7ZM1188.24 7H1192.24V5H1188.24V7ZM1196.23 7H1200.22V5H1196.23V7ZM1204.22 7H1208.21V5H1204.22V7ZM1212.21 7H1216.2V5H1212.21V7ZM1220.19 7H1224.19V5H1220.19V7ZM1228.18 7H1232.18V5H1228.18V7ZM1236.17 7H1240.17V5H1236.17V7ZM1244.16 7H1248.15V5H1244.16V7ZM1252.15 7H1256.14V5H1252.15V7ZM1260.14 7H1264.13V5H1260.14V7ZM1268.12 7H1272.12V5H1268.12V7ZM1276.11 7H1280.11V5H1276.11V7ZM1284.1 7H1288.09V5H1284.1V7ZM1292.09 7H1296.08V5H1292.09V7ZM1300.08 7H1304.07V5H1300.08V7ZM1308.07 7H1312.06V5H1308.07V7ZM1316.05 7H1320.05V5H1316.05V7ZM1324.04 7H1328.04V5H1324.04V7ZM1332.03 7H1336.02V5H1332.03V7ZM1340.02 7H1344.01V5H1340.02V7ZM1348.01 7H1350V5H1348.01V7Z"
                fill="#661F1E"
              />
            </svg>
            <p className="mb-5">{v.author_details}</p>

            <h4 className="ProductInfo-font-weight" id="recommended">
              好評推薦
            </h4>
            <svg
              className="img-fluid"
              width="1356"
              height="12"
              viewBox="0 0 1356 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1355.77 6L1350 0.226497L1344.23 6L1350 11.7735L1355.77 6ZM0 7H1.99704V5H0V7ZM5.99112 7H9.98521V5H5.99112V7ZM13.9793 7H17.9734V5H13.9793V7ZM21.9675 7H25.9615V5H21.9675V7ZM29.9556 7H33.9497V5H29.9556V7ZM37.9438 7H41.9379V5H37.9438V7ZM45.932 7H49.926V5H45.932V7ZM53.9201 7H57.9142V5H53.9201V7ZM61.9083 7H65.9024V5H61.9083V7ZM69.8964 7H73.8905V5H69.8964V7ZM77.8846 7H81.8787V5H77.8846V7ZM85.8728 7H89.8668V5H85.8728V7ZM93.8609 7H97.855V5H93.8609V7ZM101.849 7H105.843V5H101.849V7ZM109.837 7H113.831V5H109.837V7ZM117.825 7H121.819V5H117.825V7ZM125.814 7H129.808V5H125.814V7ZM133.802 7H137.796V5H133.802V7ZM141.79 7H145.784V5H141.79V7ZM149.778 7H153.772V5H149.778V7ZM157.766 7H161.76V5H157.766V7ZM165.754 7H169.748V5H165.754V7ZM173.743 7H177.737V5H173.743V7ZM181.731 7H185.725V5H181.731V7ZM189.719 7H193.713V5H189.719V7ZM197.707 7H201.701V5H197.707V7ZM205.695 7H209.689V5H205.695V7ZM213.683 7H217.677V5H213.683V7ZM221.671 7H225.666V5H221.671V7ZM229.66 7H233.654V5H229.66V7ZM237.648 7H241.642V5H237.648V7ZM245.636 7H249.63V5H245.636V7ZM253.624 7H257.618V5H253.624V7ZM261.612 7H265.606V5H261.612V7ZM269.6 7H273.595V5H269.6V7ZM277.589 7H281.583V5H277.589V7ZM285.577 7H289.571V5H285.577V7ZM293.565 7H297.559V5H293.565V7ZM301.553 7H305.547V5H301.553V7ZM309.541 7H313.535V5H309.541V7ZM317.529 7H321.523V5H317.529V7ZM325.518 7H329.512V5H325.518V7ZM333.506 7H337.5V5H333.506V7ZM341.494 7H345.488V5H341.494V7ZM349.482 7H353.476V5H349.482V7ZM357.47 7H361.464V5H357.47V7ZM365.458 7H369.452V5H365.458V7ZM373.446 7H377.441V5H373.446V7ZM381.435 7H385.429V5H381.435V7ZM389.423 7H393.417V5H389.423V7ZM397.411 7H401.405V5H397.411V7ZM405.399 7H409.393V5H405.399V7ZM413.387 7H417.381V5H413.387V7ZM421.375 7H425.37V5H421.375V7ZM429.364 7H433.358V5H429.364V7ZM437.352 7H441.346V5H437.352V7ZM445.34 7H449.334V5H445.34V7ZM453.328 7H457.322V5H453.328V7ZM461.316 7H465.31V5H461.316V7ZM469.304 7H473.298V5H469.304V7ZM477.293 7H481.287V5H477.293V7ZM485.281 7H489.275V5H485.281V7ZM493.269 7H497.263V5H493.269V7ZM501.257 7H505.251V5H501.257V7ZM509.245 7H513.239V5H509.245V7ZM517.233 7H521.227V5H517.233V7ZM525.222 7H529.216V5H525.222V7ZM533.21 7H537.204V5H533.21V7ZM541.198 7H545.192V5H541.198V7ZM549.186 7H553.18V5H549.186V7ZM557.174 7H561.168V5H557.174V7ZM565.162 7H569.156V5H565.162V7ZM573.15 7H577.145V5H573.15V7ZM581.139 7H585.133V5H581.139V7ZM589.127 7H593.121V5H589.127V7ZM597.115 7H601.109V5H597.115V7ZM605.103 7H609.097V5H605.103V7ZM613.091 7H617.085V5H613.091V7ZM621.079 7H625.074V5H621.079V7ZM629.068 7H633.062V5H629.068V7ZM637.056 7H641.05V5H637.056V7ZM645.044 7H649.038V5H645.044V7ZM653.032 7H657.026V5H653.032V7ZM661.02 7H665.014V5H661.02V7ZM669.008 7H673.002V5H669.008V7ZM676.997 7H680.991V5H676.997V7ZM684.985 7H688.979V5H684.985V7ZM692.973 7H696.967V5H692.973V7ZM700.961 7H704.955V5H700.961V7ZM708.949 7H712.943V5H708.949V7ZM716.937 7H720.931V5H716.937V7ZM724.926 7H728.92V5H724.926V7ZM732.914 7H736.908V5H732.914V7ZM740.902 7H744.896V5H740.902V7ZM748.89 7H752.884V5H748.89V7ZM756.878 7H760.872V5H756.878V7ZM764.866 7H768.86V5H764.866V7ZM772.854 7H776.849V5H772.854V7ZM780.843 7H784.837V5H780.843V7ZM788.831 7H792.825V5H788.831V7ZM796.819 7H800.813V5H796.819V7ZM804.807 7H808.801V5H804.807V7ZM812.795 7H816.789V5H812.795V7ZM820.783 7H824.777V5H820.783V7ZM828.772 7H832.766V5H828.772V7ZM836.76 7H840.754V5H836.76V7ZM844.748 7H848.742V5H844.748V7ZM852.736 7H856.73V5H852.736V7ZM860.724 7H864.718V5H860.724V7ZM868.712 7H872.706V5H868.712V7ZM876.701 7H880.695V5H876.701V7ZM884.689 7H888.683V5H884.689V7ZM892.677 7H896.671V5H892.677V7ZM900.665 7H904.659V5H900.665V7ZM908.653 7H912.647V5H908.653V7ZM916.641 7H920.635V5H916.641V7ZM924.63 7H928.624V5H924.63V7ZM932.618 7H936.612V5H932.618V7ZM940.606 7H944.6V5H940.606V7ZM948.594 7H952.588V5H948.594V7ZM956.582 7H960.576V5H956.582V7ZM964.57 7H968.564V5H964.57V7ZM972.558 7H976.553V5H972.558V7ZM980.547 7H984.541V5H980.547V7ZM988.535 7H992.529V5H988.535V7ZM996.523 7H1000.52V5H996.523V7ZM1004.51 7H1008.51V5H1004.51V7ZM1012.5 7H1016.49V5H1012.5V7ZM1020.49 7H1024.48V5H1020.49V7ZM1028.48 7H1032.47V5H1028.48V7ZM1036.46 7H1040.46V5H1036.46V7ZM1044.45 7H1048.45V5H1044.45V7ZM1052.44 7H1056.43V5H1052.44V7ZM1060.43 7H1064.42V5H1060.43V7ZM1068.42 7H1072.41V5H1068.42V7ZM1076.41 7H1080.4V5H1076.41V7ZM1084.39 7H1088.39V5H1084.39V7ZM1092.38 7H1096.38V5H1092.38V7ZM1100.37 7H1104.36V5H1100.37V7ZM1108.36 7H1112.35V5H1108.36V7ZM1116.35 7H1120.34V5H1116.35V7ZM1124.34 7H1128.33V5H1124.34V7ZM1132.32 7H1136.32V5H1132.32V7ZM1140.31 7H1144.31V5H1140.31V7ZM1148.3 7H1152.29V5H1148.3V7ZM1156.29 7H1160.28V5H1156.29V7ZM1164.28 7H1168.27V5H1164.28V7ZM1172.26 7H1176.26V5H1172.26V7ZM1180.25 7H1184.25V5H1180.25V7ZM1188.24 7H1192.24V5H1188.24V7ZM1196.23 7H1200.22V5H1196.23V7ZM1204.22 7H1208.21V5H1204.22V7ZM1212.21 7H1216.2V5H1212.21V7ZM1220.19 7H1224.19V5H1220.19V7ZM1228.18 7H1232.18V5H1228.18V7ZM1236.17 7H1240.17V5H1236.17V7ZM1244.16 7H1248.15V5H1244.16V7ZM1252.15 7H1256.14V5H1252.15V7ZM1260.14 7H1264.13V5H1260.14V7ZM1268.12 7H1272.12V5H1268.12V7ZM1276.11 7H1280.11V5H1276.11V7ZM1284.1 7H1288.09V5H1284.1V7ZM1292.09 7H1296.08V5H1292.09V7ZM1300.08 7H1304.07V5H1300.08V7ZM1308.07 7H1312.06V5H1308.07V7ZM1316.05 7H1320.05V5H1316.05V7ZM1324.04 7H1328.04V5H1324.04V7ZM1332.03 7H1336.02V5H1332.03V7ZM1340.02 7H1344.01V5H1340.02V7ZM1348.01 7H1350V5H1348.01V7Z"
                fill="#661F1E"
              />
            </svg>
            <p className="mb-5">{v.recommendation}</p>
          </Col>
        </Row>
      </>
    )
  }
  let selectedProduct = productsDetail[productId.productId - 1]
  console.log(selectedProduct)
  return (
    <Container className="ProductInfo">
      {CreateBookInfo(selectedProduct)}
    </Container>
  )
}

export default ProductInfo
