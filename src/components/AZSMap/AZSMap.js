/* eslint-disable react/jsx-equals-spacing, no-nested-ternary */
import React, { PropTypes } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const AZSMap = ({ items, center, navigate }) => {
  const mapState = { center, zoom: 6 };
  return (
    <YMaps>
      <Map state={mapState} width="100%" height="100%">
        {items.map(item =>
          <Placemark
            key={item.idx}
            onClick={() => navigate(`/azs/${item.idx}`)}
            geometry={{
              coordinates: [item.y, item.x]
            }}
            properties={{
              hintContent: item.name,
              // balloonContent: <a
              //   onClick={() => navigate(`/azs/${item.idx}`)}
              // >`${item.name}, ${item.street}`</a>
            }}
            options=
                /* eslint-disable max-len */
            {{
              preset: Math.max(...Object.values(item.products).map(p => p.status)) === 3
                ? 'islands#redGlyphIcon'
                : Math.max(...Object.values(item.products).map(p => p.status)) === 2
                  ? 'islands#blueGlyphIcon'
                  : 'islands#greenGlyphIcon',
              iconGlyph: 'tint',
              iconGlyphColor: Math.max(...Object.values(item.products).map(p => p.status)) === 3 ? 'red'
                : Math.max(...Object.values(item.products).map(p => p.status)) === 2 ? 'blue' : 'green',
            }}
          />)
        }
      </Map>
    </YMaps>);
};

AZSMap.propTypes = {
  center: PropTypes.array,
  items: PropTypes.array,
  navigate: PropTypes.func,
};

export default AZSMap;
