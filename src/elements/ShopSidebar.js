import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import SlideDragable from "./SlideDragable";
import { useNavigate, useLocation } from "react-router-dom";
// API imports
import { getallAuthors } from "../api/routes/products/getallAuthors";
import { getallLanguages } from "../api/routes/products/getallLanguages";
import { getallPublishers } from "../api/routes/products/getallPublishers";
import { getallTags } from "../api/routes/products/getallTags";
import { getallYears } from "../api/routes/products/getallYears";
import { getminPriceAndMaxPrice } from "../api/routes/products/getminPriceAndMaxPrice";
import { getbydate } from "../api/routes/products/getbydate";
import { getbydiscount } from "../api/routes/products/getbydiscount";

const languageMap = {
  pt: "Português",
  en: "Inglês",
  es: "Espanhol",
  fr: "Francês",
  de: "Alemão",
  it: "Italiano",
  zh: "Chinês",
  ja: "Japonês",
  ru: "Russo",
  ar: "Árabe",
};

const ShopSidebar = ({ currentLink = "" }) => {
  const navigate = useNavigate();
  const [allAuthors, setAllAuthors] = useState([]);
  const [allPublishers, setAllPublishers] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [allYears, setAllYears] = useState([]);
  const [minPriceAndMaxPrice, setMinPriceAndMaxPrice] = useState({
    minPrice: 0,
    maxPrice: 1,
  });
  const [selectPrice, setSelectPrice] = useState({
    minPrice: 0,
    maxPrice: 1,
  });
  const [allLanguages, setAllLanguages] = useState([]);
  const [bydiscount, setByDiscount] = useState([]);
  const [bydate, setByDate] = useState([]);

  // Filtros selecionados
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          authors,
          languages,
          publishers,
          tags,
          years,
          priceRange,
          byDateRes,
          byDiscountRes,
        ] = await Promise.all([
          getallAuthors(),
          getallLanguages(),
          getallPublishers(),
          getallTags(),
          getallYears(),
          getminPriceAndMaxPrice(),
          getbydate(),
          getbydiscount(),
        ]);

        setAllAuthors(authors);
        setAllLanguages(languages);
        setAllPublishers(publishers);
        setAllTags(tags);
        setAllYears(years);
     
        setMinPriceAndMaxPrice(priceRange);
        setSelectPrice(priceRange);
        setByDate(byDateRes);
        setByDiscount(byDiscountRes);
      } catch (err) {
        console.error("Erro ao carregar filtros:", err);
      }
    }
    fetchData();
  }, []);

  const handleCheckboxChange = (value, selectedList, setSelectedList) => {
    setSelectedList((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSearch = () => {
    const filtros = {
      category:selectedCategory || "",
      author_product: selectedAuthors.join(","),
      tags: selectedTags.join(","),
      publisher_product: selectedPublishers.join(","),
      date_product: selectedYears.join(","),
      language: selectedLanguages.map((lang) => languageMap[lang] || lang).join(","),
      promotion_id: selectedPromotion,
      price_min: selectPrice.minPrice,
      price_max: selectPrice.maxPrice,
    };
  
    const queryParams = new URLSearchParams();
  
    Object.entries(filtros).forEach(([key, value]) => {
      if (value != null && value !== "") {
        console.log(`Filtro: ${key} = ${value}`); // Log para confirmar
        queryParams.append(key, value);
      }
    });
  
    const url = `${currentLink}?${queryParams.toString()}`;
    navigate(url);
  };
  
  
  return (
    <div className="shop-filter">
      <div className="d-flex justify-content-between">
        <h4 className="title">Filtros</h4>
        <Link to="#" className="panel-close-btn">
          <i className="flaticon-close"></i>
        </Link>
      </div>
      <Accordion className="accordion-filter" defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Preço</Accordion.Header>
          <Accordion.Body>
            <div className="range-slider style-1">
              <div id="slider-tooltips">
                {minPriceAndMaxPrice.minPrice !== null &&
                  minPriceAndMaxPrice.maxPrice !== null && (
                    <SlideDragable
                    minPrice={minPriceAndMaxPrice.minPrice}
                    maxPrice={minPriceAndMaxPrice.maxPrice}
                    choosedMinPrice={selectPrice.minPrice}
                    choosedMaxPrice={selectPrice.maxPrice}
                    onChange={({ min, max }) => {
                      if (
                        min !== selectPrice.minPrice ||
                        max !== selectPrice.maxPrice
                      ) {
                        setSelectPrice({
                          minPrice: min,
                          maxPrice: max,
                        });
                      }
                    }}
                  />
                  
                  )}
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        {/*<Accordion.Item eventKey="50">
          <Accordion.Header>Destaques</Accordion.Header>
          <Accordion.Body>
            <div className="widget dz-widget_services">
              
                <div className="form-check search-content" key={"1"}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="destaque"
                    id="destaque1"
                    value={"mostSold"}
                    checked={selectedCategory === "mostSold"}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="destaque1"
                  >
                    Livros Mais Vendidos 
                  </label>
                </div>
                <div className="form-check search-content" key={"2"}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="destaque"
                    id="destaque1"
                    value={"mostLiked"}
                    checked={selectedCategory === "mostLiked"}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="destaque1"
                  >
                    Livros Mais Populares 
                  </label>
                </div>
                <div className="form-check search-content" key={"3"}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="destaque"
                    id="destaque1"
                    value={"opportunities"}
                    checked={selectedCategory === "opportunities"}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="destaque1"
                  >
                    Oportunidades
                  </label>
                </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>*/}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Promoções</Accordion.Header>
          <Accordion.Body>
            <div className="widget dz-widget_services">
              {bydiscount.map((item, ind) => (
                <div className="form-check search-content" key={ind}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="promotion"
                    id={`promotionRadio-${ind}`}
                    value={item.promotionId}
                    checked={selectedPromotion === String(item.promotionId)}
                    onChange={(e) => setSelectedPromotion(e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`promotionRadio-${ind}`}
                  >
                    {item.title} - {item.discount}%
                  </label>
                </div>
              ))}
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Categorias</Accordion.Header>
          <Accordion.Body>
            <div
              className="widget dz-widget_services"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "1rem", // espaço entre colunas
                rowGap: "0rem", // espaço entre linhas (reduzido)
              }}
            >
              {allTags.map((tag, ind) => (
                <div className="form-check search-content" key={ind}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`tagCheck-${ind}`}
                    value={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={() =>
                      handleCheckboxChange(tag, selectedTags, setSelectedTags)
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`tagCheck-${ind}`}
                  >
                    {tag}
                  </label>
                </div>
              ))}
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Editoras</Accordion.Header>
          <Accordion.Body>
            <div className="widget dz-widget_services">
              {allPublishers.map((item, ind) => (
                <div className="form-check search-content" key={ind}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`publisherCheck-${ind}`}
                    value={item.publisher_product}
                    checked={selectedPublishers.includes(
                      item.publisher_product
                    )}
                    onChange={() =>
                      handleCheckboxChange(
                        item.publisher_product,
                        selectedPublishers,
                        setSelectedPublishers
                      )
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`publisherCheck-${ind}`}
                  >
                    {item.publisher_product}
                  </label>
                </div>
              ))}
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>Autores</Accordion.Header>
          <Accordion.Body>
            <div className="widget dz-widget_services">
              {allAuthors.map((item, ind) => (
                <div className="form-check search-content" key={ind}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`authorCheck-${ind}`}
                    value={item.author_product}
                    checked={selectedAuthors.includes(item.author_product)}
                    onChange={() =>
                      handleCheckboxChange(
                        item.author_product,
                        selectedAuthors,
                        setSelectedAuthors
                      )
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`authorCheck-${ind}`}
                  >
                    {item.author_product}
                  </label>
                </div>
              ))}
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>Ano</Accordion.Header>
          <Accordion.Body>
            <div
              className="widget dz-widget_services"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "1rem",
                rowGap: "0rem",
              }}
            >
              {allYears.map((year, ind) => (
                <div className="form-check search-content" key={ind}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`yearCheck-${ind}`}
                    value={year}
                    checked={selectedYears.includes(year)}
                    onChange={() =>
                      handleCheckboxChange(
                        year,
                        selectedYears,
                        setSelectedYears
                      )
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`yearCheck-${ind}`}
                  >
                    {year}
                  </label>
                </div>
              ))}
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
          <Accordion.Header>Idioma</Accordion.Header>
          <Accordion.Body>
            <div className="widget dz-widget_services">
              {allLanguages.map((item, ind) => (
                <div className="form-check search-content" key={ind}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`languageCheck-${ind}`}
                    value={item.language}
                    checked={selectedLanguages.includes(item.language)}
                    onChange={() =>
                      handleCheckboxChange(
                        item.language,
                        selectedLanguages,
                        setSelectedLanguages
                      )
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`languageCheck-${ind}`}
                  >
                    {languageMap[item.language] || item.language}
                  </label>
                </div>
              ))}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="row filter-buttons">
        <div>
          <button
            className="btn btn-secondary btnhover mt-4 d-block"
            onClick={handleSearch}
            style={{ width: "100%" }}
          >
            Procurar
          </button>
          <Link
            to="#"
            className="btn btn-outline-secondary btnhover mt-3 d-block"
          >
            Limpar Filtros
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar;
