"""Compatibility alias package for the installed distribution name `mlproject`.

This module re-exports the real package `wine_quality_prediction` so code
or notebooks that import `mlproject` will work:

    import mlproject
    from mlproject import <symbols>

The file is intentionally minimal and defensive so static analysis (Pylance)
and runtime imports both behave sensibly.
"""
from importlib import import_module as _import_module

try:
    # Import the real package and re-export its public API
    _pkg = _import_module("wine_quality_prediction")
    # Build __all__ from the package's __all__ if available, else public attrs
    _public = getattr(_pkg, "__all__", [n for n in dir(_pkg) if not n.startswith("_")])
    for _name in _public:
        try:
            globals()[_name] = getattr(_pkg, _name)
        except Exception:
            # ignore any attribute import failures
            pass
    __all__ = list(_public)
except Exception:
    # If the real package isn't importable yet, provide a minimal fallback
    __all__ = []
