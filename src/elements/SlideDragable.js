import React, { useEffect, useRef } from 'react';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

const SlideDragable = ({ minPrice = 0, maxPrice = 1000, choosedMinPrice = 0, choosedMaxPrice = 1000, onChange }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    // Destroi slider anterior se existir
    if (sliderRef.current.noUiSlider) {
      sliderRef.current.noUiSlider.destroy();
    }

    // Cria novo slider
    noUiSlider.create(sliderRef.current, {
      start: [choosedMinPrice, choosedMaxPrice],
      connect: true,
      tooltips: true,
      behaviour: 'tap-drag',
      range: {
        min: minPrice,
        max: maxPrice
      },
      format: {
        to: value => Math.round(value),
        from: value => Number(value),
      }
    });

    // Listener de alteração
    if (onChange) {
      sliderRef.current.noUiSlider.on('update', (values) => {
        onChange({
          min: parseFloat(values[0]),
          max: parseFloat(values[1]),
        });
      });
    }
  }, [minPrice, maxPrice, choosedMinPrice, choosedMaxPrice, onChange]);

  return (
    <div className="slider" id="SlideDragable">
      <div id="W3NoUISlider" ref={sliderRef}></div>
    </div>
  );
};

export default SlideDragable;
