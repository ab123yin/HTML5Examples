// Generated by CoffeeScript 1.6.1
(function() {
  var ALIVE, Cell, DEAD, canvas, cellAt, cellHeight, cellWidth, cells, createCells, ctx, executeFrame, i, initializeCells, iterate, keepGoing, linkNeighbors, m, n, q, render, start, stop, _i;

  canvas = automata;

  ctx = canvas.getContext('2d');

  DEAD = 0;

  ALIVE = 1;

  q = 6;

  n = Math.pow(2, q + 2);

  m = Math.pow(2, q);

  cellWidth = canvas.width / n;

  cellHeight = canvas.height / m;

  cells = [];

  cellAt = function(i, j) {
    i = (i + n) % n;
    j = (j + m) % m;
    return cells[i + j * n];
  };

  Cell = (function() {

    function Cell(i, j) {
      this.i = i;
      this.j = j;
      this.status = DEAD;
      this.next = DEAD;
      this.neighbors = [];
    }

    Cell.prototype.addNeighbor = function(neighbor) {
      return this.neighbors.push(neighbor);
    };

    Cell.prototype.paint = function() {
      var x, y;
      x = this.i * cellWidth;
      y = this.j * cellHeight;
      ctx.fillStyle = this.status ? 'white' : 'black';
      return ctx.fillRect(x, y, cellWidth, cellHeight);
    };

    return Cell;

  })();

  createCells = function() {
    var i, j, _i, _results;
    _results = [];
    for (j = _i = 0; 0 <= m ? _i < m : _i > m; j = 0 <= m ? ++_i : --_i) {
      _results.push((function() {
        var _j, _results1;
        _results1 = [];
        for (i = _j = 0; 0 <= n ? _j < n : _j > n; i = 0 <= n ? ++_j : --_j) {
          _results1.push(cells.push(new Cell(i, j)));
        }
        return _results1;
      })());
    }
    return _results;
  };

  initializeCells = function() {
    var c, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = cells.length; _i < _len; _i++) {
      c = cells[_i];
      _results.push(c.status = Math.round(Math.random()));
    }
    return _results;
  };

  linkNeighbors = function() {
    var cell, i, j, x, y, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = cells.length; _i < _len; _i++) {
      cell = cells[_i];
      _results.push((function() {
        var _j, _results1;
        _results1 = [];
        for (x = _j = -1; _j <= 1; x = ++_j) {
          _results1.push((function() {
            var _k, _results2;
            _results2 = [];
            for (y = _k = -1; _k <= 1; y = ++_k) {
              if ((x !== 0) || (y !== 0)) {
                i = cell.i + x;
                j = cell.j + y;
                _results2.push(cell.addNeighbor(cellAt(i, j)));
              } else {
                _results2.push(void 0);
              }
            }
            return _results2;
          })());
        }
        return _results1;
      })());
    }
    return _results;
  };

  render = function() {
    return _.each(cells, function(cell) {
      return cell.paint();
    });
  };

  iterate = function() {
    var c, neighbor, neighbors, _i, _j, _k, _len, _len1, _len2, _ref, _results;
    for (_i = 0, _len = cells.length; _i < _len; _i++) {
      c = cells[_i];
      neighbors = 0;
      _ref = c.neighbors;
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        neighbor = _ref[_j];
        neighbors += neighbor.status;
      }
      if ((c.status === ALIVE) && (neighbors < 2)) {
        c.next = DEAD;
      }
      if ((c.status === ALIVE) && ((2 <= neighbors && neighbors <= 3))) {
        c.next = ALIVE;
      }
      if ((c.status === ALIVE) && (neighbors > 3)) {
        c.next = DEAD;
      }
      if ((c.status === DEAD) && (neighbors === 3)) {
        c.next = ALIVE;
      }
    }
    _results = [];
    for (_k = 0, _len2 = cells.length; _k < _len2; _k++) {
      c = cells[_k];
      _results.push(c.status = c.next);
    }
    return _results;
  };

  keepGoing = false;

  start = function() {
    keepGoing = true;
    return executeFrame();
  };

  stop = function() {
    return keepGoing = false;
  };

  executeFrame = function() {
    iterate();
    render();
    if (keepGoing) {
      return requestAnimationFrame(executeFrame);
    }
  };

  createCells();

  linkNeighbors();

  initializeCells();

  canvas.addEventListener('mouseover', start);

  canvas.addEventListener('mouseout', stop);

  canvas.addEventListener('mousedown', initializeCells);

  for (i = _i = 0; _i <= 5; i = ++_i) {
    executeFrame();
  }

  setInterval((function() {
    if (!keepGoing) {
      return executeFrame();
    }
  }), 1000);

}).call(this);
