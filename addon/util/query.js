export default (function () {
  var $self = {};
  $self.store = {};
  $self.decodeStore = {};
  $self.built = false;
  $self.queryString = undefined;
  $self.re = /([^&=]+)=?([^&]*)/g;
  $self.m = null;

  $self.build = function (data, parent) {
    if (Object.prototype.toString.call(data) !== "[object Object]")
      return "";

    parent = parent || "";

    var query = parent ? "" : "?"
      , okey
      , value
      , i = 0;

    for (var key in data) {
      okey = parent ? parent + "[" + $self.encode(key) + "]" : $self.encode(key);

      if (value = data[key]) {
        if (Object.prototype.toString.call(value) === "[object Array]") {
          for (i = 0, l = value.length; i < l; ++i) {
            if (typeof value[i] === "object") query += $self.build(value[i], okey + "[" + i + "]");
            else query += okey + "=" + $self.encode(value[i]) + "&";
          }
        } else if (Object.prototype.toString.call(value) === "[object Object]") {
          for (i in value) {
            if (typeof value[i] === "object") query += $self.build(value[i], okey + "[" + i + "]");
            else query += okey + "[" + i + "]=" + $self.encode(value[i]) + "&";
          }
        } else {
          query += okey + "=" + $self.encode(value.toString()) + "&";
        }
      } else {
        query += okey + "&";
      }
    }

    return query.substring(0, query.length - 1);
  };

  $self.getQueryString = function () {
    var search = window.location.search.substring(1);
    var hash = window.location.hash.split("?"); hash.shift();
    return (search && search !== "") ? search : (hash.length > 0) ? hash.join("?") : undefined;
  };

  $self.encode = function (str) {
    return encodeURIComponent(str.toString());
  };

  $self.decode = function (str) {
    if (!$self.decodeStore[str])
      $self.decodeStore[str] = decodeURIComponent(str.replace(/\+/g, ' '));

    return $self.decodeStore[str];
  };

  $self.get = function (name, rebuild) {
    name = String(name).replace(/[.*+?|()\[\]{}\\]/g, '\\$&');
    return $self.parse({ name: name, rebuild: rebuild });
  };

  $self.parse = function (opts) {
    opts = opts || {};

    if (!$self.built || opts.rebuild) {
      $self.queryString = typeof opts.query === 'string' ? opts.query : $self.getQueryString();

      if (typeof $self.queryString === 'string' && $self.queryString.length > 0) {
        var index, aname, pname, $key, $value, $decodeKey, $decodeValue;

        if ($self.queryString[0] === "?")
          $self.queryString = $self.queryString.substring(1);

        $self.store = {};
        $self.decodeStore = {};

        while ($self.m = $self.re.exec($self.queryString)) {
          $key = $self.m[1]; $value = $self.m[2];
          $decodeKey = $self.decode($key); $decodeValue = $self.decode($value);

          if ($self.m[1].indexOf("[") === -1)
            if (!($decodeKey in $self.store))
              $self.store[$decodeKey] = $decodeValue;
            else if (typeof $self.store[$decodeKey] !== 'object')
              $self.store[$decodeKey] = [ $self.store[$decodeKey], $decodeValue ];
            else
              Array.prototype.push.call($self.store[$decodeKey], $decodeValue);
          else {
            index = $key.indexOf("[");
            aname = $self.decode($key.slice(index + 1, $key.indexOf("]", index)));
            pname = $self.decode($key.slice(0, index));

            if (typeof $self.store[pname] !== "object") {
              $self.store[pname] = {};
              $self.store[pname].length = 0;
            }

            if (aname) $self.store[pname][aname] = $decodeValue;
            else Array.prototype.push.call($self.store[pname], $decodeValue);
          }
        }
      } else return undefined;

      $self.built = true;
    }

    return opts.name ? ((opts.name in $self.store) ? $self.store[opts.name] : undefined) : $self.store;
  };

  return $self;
})()
