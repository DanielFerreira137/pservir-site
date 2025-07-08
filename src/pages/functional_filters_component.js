import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// API imports - mesmas do ShopSidebar
import { getallAuthors } from "../api/routes/products/getallAuthors";
import { getallLanguages } from "../api/routes/products/getallLanguages";
import { getallPublishers } from "../api/routes/products/getallPublishers";
import { getallTags } from "../api/routes/products/getallTags";
import { getallYears } from "../api/routes/products/getallYears";
import { getminPriceAndMaxPrice } from "../api/routes/products/getminPriceAndMaxPrice";
import { getbydate } from "../api/routes/products/getbydate";
import { getbydiscount } from "../api/routes/products/getbydiscount";

// Componente de Filtros Funcionais para Modal
const FunctionalFilters = ({ currentLink = "", onClose }) => {
  const navigate = useNavigate();
  
  // Estados dos filtros - mesmos do ShopSidebar
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Estados dos dados da API - mesmos do ShopSidebar
  const [allAuthors, setAllAuthors] = useState([]);
  const [allPublishers, setAllPublishers] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [allYears, setAllYears] = useState([]);
  const [minPriceAndMaxPrice, setMinPriceAndMaxPrice] = useState({
    minPrice: 0,
    maxPrice: 100,
  });
  const [selectPrice, setSelectPrice] = useState({
    minPrice: 0,
    maxPrice: 100,
  });
  const [allLanguages, setAllLanguages] = useState([]);
  const [bydiscount, setByDiscount] = useState([]);
  const [bydate, setByDate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mapa de idiomas - mesmo do ShopSidebar
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

  // Carregar dados da API - mesma lógica do ShopSidebar
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        console.log('Carregando dados dos filtros...');
        
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

        console.log('Dados carregados:', { authors, languages, publishers, tags, years, priceRange });

        setAllAuthors(authors || []);
        setAllLanguages(languages || []);
        setAllPublishers(publishers || []);
        setAllTags(tags || []);
        setAllYears(years || []);
        
        // Validar e corrigir dados de preço
        const validPriceRange = {
          minPrice: (priceRange && typeof priceRange.minPrice === 'number') ? priceRange.minPrice : 0,
          maxPrice: (priceRange && typeof priceRange.maxPrice === 'number') ? priceRange.maxPrice : 100,
        };
        
        // Garantir que os valores são números válidos
        if (validPriceRange.minPrice >= validPriceRange.maxPrice) {
          validPriceRange.minPrice = 0;
          validPriceRange.maxPrice = 100;
        }
        
        console.log('Preços validados:', validPriceRange);
        
        setMinPriceAndMaxPrice(validPriceRange);
        setSelectPrice(validPriceRange);
        setByDate(byDateRes || []);
        setByDiscount(byDiscountRes || []);
        
        setIsLoading(false);
      } catch (err) {
        console.error("Erro ao carregar filtros:", err);
        setIsLoading(false);
        
        // Fallback com valores seguros
        setMinPriceAndMaxPrice({ minPrice: 0, maxPrice: 100 });
        setSelectPrice({ minPrice: 0, maxPrice: 100 });
      }
    }
    fetchData();
  }, []);

  const handleCheckboxChange = (value, selectedList, setSelectedList) => {
    setSelectedList(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  // Função de aplicar filtros - mesma lógica do ShopSidebar
  const handleApplyFilters = () => {
    const filtros = {
      category: selectedCategory || "",
      author_product: selectedAuthors.join(","),
      tags: selectedTags.join(","),
      publisher_product: selectedPublishers.join(","),
      date_product: selectedYears.join(","),
      language: selectedLanguages.map(lang => languageMap[lang] || lang).join(","),
      promotion_id: selectedPromotion,
      price_min: Math.round(selectPrice.minPrice),
      price_max: Math.round(selectPrice.maxPrice),
    };

    const queryParams = new URLSearchParams();

    Object.entries(filtros).forEach(([key, value]) => {
      if (value != null && value !== "") {
        console.log(`Filtro: ${key} = ${value}`);
        queryParams.append(key, value);
      }
    });

    const url = `${currentLink}?${queryParams.toString()}`;
    navigate(url);
    
    if (onClose) {
      onClose();
    }
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setSelectedAuthors([]);
    setSelectedPublishers([]);
    setSelectedYears([]);
    setSelectedLanguages([]);
    setSelectedPromotion("");
    setSelectedCategory("");
    setSelectPrice(minPriceAndMaxPrice);
    
    navigate(currentLink);
    
    if (onClose) {
      onClose();
    }
  };

  if (isLoading) {
    return (
      <div className="functional-filters p-3">
        <div className="text-center p-4">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          Carregando filtros...
        </div>
      </div>
    );
  }

  return (
    <div className="functional-filters p-3">
      <div className="mb-4">
        <h5 className="fw-bold text-primary mb-3">
          <i className="fas fa-filter me-2"></i>
          Filtros
        </h5>
      </div>

      {/* Filtro de Preço */}
      <div className="filter-section mb-4">
        <h6 className="fw-bold mb-3">
          <i className="fas fa-euro-sign me-2"></i>
          Preço
        </h6>
        <div className="row mb-3">
          <div className="col-6">
            <label className="form-label small">Mínimo: {Math.round(selectPrice.minPrice)}€</label>
            <input
              type="range"
              className="form-range"
              min={minPriceAndMaxPrice.minPrice}
              max={minPriceAndMaxPrice.maxPrice}
              step="1"
              value={selectPrice.minPrice}
              onChange={(e) => {
                const newMin = Number(e.target.value);
                if (newMin <= selectPrice.maxPrice) {
                  setSelectPrice(prev => ({ ...prev, minPrice: newMin }));
                }
              }}
            />
          </div>
          <div className="col-6">
            <label className="form-label small">Máximo: {Math.round(selectPrice.maxPrice)}€</label>
            <input
              type="range"
              className="form-range"
              min={minPriceAndMaxPrice.minPrice}
              max={minPriceAndMaxPrice.maxPrice}
              step="1"
              value={selectPrice.maxPrice}
              onChange={(e) => {
                const newMax = Number(e.target.value);
                if (newMax >= selectPrice.minPrice) {
                  setSelectPrice(prev => ({ ...prev, maxPrice: newMax }));
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Promoções */}
      {bydiscount.length > 0 && (
        <div className="filter-section mb-4">
          <h6 className="fw-bold mb-3">
            <i className="fas fa-percentage me-2"></i>
            Promoções {selectedPromotion && <span className="badge bg-primary">1</span>}
          </h6>
          {bydiscount.map((item, ind) => (
            <div className="form-check mb-2" key={ind}>
              <input
                className="form-check-input"
                type="radio"
                name="promotion"
                id={`promo-${ind}`}
                value={item.promotionId}
                checked={selectedPromotion === String(item.promotionId)}
                onChange={(e) => setSelectedPromotion(e.target.value)}
              />
              <label className="form-check-label" htmlFor={`promo-${ind}`}>
                <span className="badge bg-danger me-2">{item.discount}%</span>
                {item.title}
              </label>
            </div>
          ))}
        </div>
      )}

      {/* Categorias */}
      {allTags.length > 0 && (
        <div className="filter-section mb-4">
          <h6 className="fw-bold mb-3">
            <i className="fas fa-tags me-2"></i>
            Categorias {selectedTags.length > 0 && <span className="badge bg-primary">{selectedTags.length}</span>}
          </h6>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {allTags.map((tag, ind) => (
              <div className="form-check mb-2" key={ind}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`tag-${ind}`}
                  value={tag}
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleCheckboxChange(tag, selectedTags, setSelectedTags)}
                />
                <label className="form-check-label" htmlFor={`tag-${ind}`}>
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editoras */}
      {allPublishers.length > 0 && (
        <div className="filter-section mb-4">
          <h6 className="fw-bold mb-3">
            <i className="fas fa-building me-2"></i>
            Editoras {selectedPublishers.length > 0 && <span className="badge bg-primary">{selectedPublishers.length}</span>}
          </h6>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {allPublishers.map((item, ind) => (
              <div className="form-check mb-2" key={ind}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`publisher-${ind}`}
                  value={item.publisher_product}
                  checked={selectedPublishers.includes(item.publisher_product)}
                  onChange={() => handleCheckboxChange(
                    item.publisher_product,
                    selectedPublishers,
                    setSelectedPublishers
                  )}
                />
                <label className="form-check-label" htmlFor={`publisher-${ind}`}>
                  {item.publisher_product}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Autores */}
      {allAuthors.length > 0 && (
        <div className="filter-section mb-4">
          <h6 className="fw-bold mb-3">
            <i className="fas fa-user-edit me-2"></i>
            Autores {selectedAuthors.length > 0 && <span className="badge bg-primary">{selectedAuthors.length}</span>}
          </h6>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {allAuthors.map((item, ind) => (
              <div className="form-check mb-2" key={ind}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`author-${ind}`}
                  value={item.author_product}
                  checked={selectedAuthors.includes(item.author_product)}
                  onChange={() => handleCheckboxChange(
                    item.author_product,
                    selectedAuthors,
                    setSelectedAuthors
                  )}
                />
                <label className="form-check-label" htmlFor={`author-${ind}`}>
                  {item.author_product}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Anos */}
      {allYears.length > 0 && (
        <div className="filter-section mb-4">
          <h6 className="fw-bold mb-3">
            <i className="fas fa-calendar me-2"></i>
            Ano {selectedYears.length > 0 && <span className="badge bg-primary">{selectedYears.length}</span>}
          </h6>
          <div className="row" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {allYears.map((year, ind) => (
              <div className="col-6 mb-2" key={ind}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`year-${ind}`}
                    value={year}
                    checked={selectedYears.includes(year)}
                    onChange={() => handleCheckboxChange(year, selectedYears, setSelectedYears)}
                  />
                  <label className="form-check-label" htmlFor={`year-${ind}`}>
                    {year}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Idiomas */}
      {allLanguages.length > 0 && (
        <div className="filter-section mb-4">
          <h6 className="fw-bold mb-3">
            <i className="fas fa-language me-2"></i>
            Idioma {selectedLanguages.length > 0 && <span className="badge bg-primary">{selectedLanguages.length}</span>}
          </h6>
          {allLanguages.map((item, ind) => (
            <div className="form-check mb-2" key={ind}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`lang-${ind}`}
                value={item.language}
                checked={selectedLanguages.includes(item.language)}
                onChange={() => handleCheckboxChange(
                  item.language,
                  selectedLanguages,
                  setSelectedLanguages
                )}
              />
              <label className="form-check-label" htmlFor={`lang-${ind}`}>
                {languageMap[item.language] || item.language}
              </label>
            </div>
          ))}
        </div>
      )}

      {/* Botões de Ação */}
      <div className="filter-buttons mt-4 pt-3 border-top">
        <div className="d-grid gap-2">
          <button
            className="btn btn-primary"
            onClick={handleApplyFilters}
          >
            <i className="fas fa-search me-2"></i>
            Procurar
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={handleClearFilters}
          >
            <i className="fas fa-times me-2"></i>
            Limpar Filtros
          </button>
        </div>
      </div>

      {/* CSS do componente */}
      <style jsx>{`
        .functional-filters .filter-section {
          border-bottom: 1px solid #e9ecef;
          padding-bottom: 1rem;
        }
        
        .functional-filters .form-check {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        
        .functional-filters .form-check-input {
          margin-top: 0;
          margin-right: 0.5rem;
        }
        
        .functional-filters .badge {
          font-size: 0.7em;
        }
        
        .functional-filters .form-range {
          margin-bottom: 0.5rem;
        }
        
        .functional-filters h6 {
          color: #495057;
          margin-bottom: 1rem;
        }
        
        .functional-filters .filter-buttons {
          background: white;
          position: sticky;
          bottom: 0;
          margin: 0 -1rem;
          padding: 1rem;
          border-top: 2px solid #e9ecef;
        }
        
        .functional-filters .form-check-label {
          font-size: 0.9rem;
          cursor: pointer;
        }
        
        .functional-filters .form-check-input:checked {
          background-color: #007bff;
          border-color: #007bff;
        }
        
        .functional-filters .btn {
          font-weight: 500;
          border-radius: 8px;
        }
        
        .functional-filters .btn-primary {
          background: linear-gradient(45deg, #007bff, #0056b3);
          border: none;
        }
        
        .functional-filters .btn-primary:hover {
          background: linear-gradient(45deg, #0056b3, #003d82);
          transform: translateY(-1px);
        }
        
        .functional-filters .btn-outline-secondary:hover {
          transform: translateY(-1px);
        }
        
        .spinner-border-sm {
          width: 1rem;
          height: 1rem;
        }
      `}</style>
    </div>
  );
};

export default FunctionalFilters;