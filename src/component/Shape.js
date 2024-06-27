import React, { useMemo, useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import './style.css';  // Đảm bảo đường dẫn chính xác

const Shape = ({ data }) => {
  // Nếu data không xác định hoặc không phải là mảng, khởi tạo giá trị mặc định
  const boxes = useMemo(() => {
    return Array.isArray(data) ? data.flat(Infinity) : [];
  }, [data]);

  const [selected, setSelected] = useState(new Set());
  const [unloading, setUnloading] = useState(false);

  const handleClick = (event) => {
    const target = event.target;
    const index = target.getAttribute('data-index');
    const status = target.getAttribute('data-status');

    if (index === null || status === 'hidden' || unloading) {
      return;
    }

    setSelected((prev) => {
      const updated = new Set(prev);
      updated.add(index);
      return updated;
    });
  };

  const visibleBoxesCount = useMemo(() => {
    return boxes.reduce((acc, box) => box === 1 ? acc + 1 : acc, 0);
  }, [boxes]);

  useEffect(() => {
    if (selected.size >= visibleBoxesCount) {
      unload();
    }
  }, [selected, visibleBoxesCount]);

  const timerRef = useRef(null);

  const unload = () => {
    setUnloading(true);
    const keys = Array.from(selected.keys());

    const removeNextKey = () => {
      if (keys.length) {
        const currentKey = keys.shift();
        setSelected((prev) => {
          const updated = new Set(prev);
          updated.delete(currentKey);
          return updated;
        });
        timerRef.current = setTimeout(removeNextKey, 500);
      } else {
        setUnloading(false);
      }
    };

    removeNextKey();
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  // Nếu boxes rỗng, không cần render các hộp
  if (boxes.length === 0) {
    return null;
  }

  return (
    <div className="boxes" onClick={handleClick}>
      {boxes.map((box, index) => {
        const status = box === 1 ? 'visible' : 'hidden';
        const isSelected = selected.has(index.toString());
        return (
          <div
            key={`${box}-${index}`}
            data-index={index}
            data-status={status}
            className={classNames('box', status, { 'selected': isSelected })}
          />
        );
      })}
    </div>
  );
};

export default Shape;
